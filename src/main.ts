import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import qrcode from 'qrcode-generator';

interface Cover {
  title: string;
  url: string;
  receiveUri?: string;
  status?: 'available' | 'claimed';
}

@customElement('covers-app')
export class CoversApp extends LitElement {
  static styles = css`
    /* WeUI tokens inherited from body via Shadow DOM — no re-declaration needed */
    :host { display: block; }
    * { box-sizing: border-box; margin: 0; padding: 0; }

    /* ── Page ── */
    .page-wrapper { min-height: 100vh; background: var(--weui-BG-0); }
    .page-container { background: var(--weui-BG-3); }

    /* ── Header ── */
    .page-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: var(--weui-BG-2);
      position: sticky; top: 0; z-index: 500;
    }
    .page-header::after {
      content: ""; position: absolute; left: 0; bottom: 0; right: 0;
      height: 1px; border-bottom: 1px solid var(--weui-FG-3);
      transform-origin: 0 100%; transform: scaleY(.5);
    }
    h1.page-title {
      font-size: 17px; font-weight: 500;
      color: var(--weui-FG-0);
    }
    .redeem-btn {
      font-size: 14px; padding: 6px 12px;
      background: var(--weui-BRAND); color: #fff;
      border: none; border-radius: 6px;
      font-weight: 500; white-space: nowrap;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }
    .redeem-btn:active::before {
      content: ""; position: absolute; inset: 0;
      background: rgba(0,0,0,.1); border-radius: 6px;
    }

    /* ── Grid — outer rounded, inner squared ── */
    .covers-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
      gap: .2em;
      border-radius: 12px;
      overflow: hidden;
      max-width: 1080px;
      margin: 1em auto;
      width: 90%;
    }
    @media (min-width: 480px) {
      .covers-grid { grid-template-columns: repeat(auto-fill, minmax(12em, 1fr)); }
    }
    @media (min-width: 768px) {
      .covers-grid { grid-template-columns: repeat(auto-fill, minmax(14em, 1fr)); }
    }

    /* ── Cover Item — squared, no border-radius ── */
    .cover-item {
      background: var(--weui-BG-2);
      padding: 16px 8px;
      display: flex; flex-direction: column;
      align-items: center; gap: 8px;
      min-height: 110px;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }
    .cover-item:hover:not(.claimed) {
      background: linear-gradient(135deg, rgba(250,81,81,.06), rgba(250,81,81,.16)), var(--weui-BG-2);
    }
    .cover-item:active:not(.claimed) { background: var(--weui-BG-COLOR-ACTIVE); }
    .cover-item.claimed { opacity: .5; cursor: default; }

    /* ── Thumbnail — bare emoji ── */
    .cover-thumbnail {
      width: 48px; height: 48px; font-size: 36px;
      display: flex; align-items: center; justify-content: center;
      line-height: 1;
    }
    .cover-thumbnail.claimed { opacity: .5; filter: grayscale(.6); }

    /* ── Title ── */
    .cover-title {
      font-size: 12px; color: var(--weui-FG-0);
      text-align: center; line-height: 1.4;
      overflow: hidden;
      display: -webkit-box; -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-word; width: 100%;
    }
    .cover-title.claimed { color: var(--weui-FG-2); }

    /* ── Status Badge ── */
    .status-badge {
      font-size: 10px; color: var(--weui-FG-1);
      background: var(--weui-BG-3); padding: 1px 6px;
      border-radius: 8px; margin-top: auto;
    }

    /* ── Article Badge — bottom-right corner ── */
    .article-badge {
      position: absolute; right: 4px; bottom: 4px;
      font-size: 9px; line-height: 1;
      color: var(--weui-LINK); background: var(--weui-BG-3);
      padding: 2px 5px; border-radius: 4px;
      pointer-events: none;
    }

    /* ── Mask ── */
    .dialog-mask, .toast-mask {
      position: fixed; inset: 0;
      background: rgba(0,0,0,.6); z-index: 5000;
    }

    /* ── Dialog ── */
    .dialog {
      position: fixed; z-index: 5001;
      top: 50%; left: 50%;
      transform: translate(-50%,-50%);
      background: var(--weui-BG-2);
      border-radius: 12px; overflow: hidden;
      width: 320px; max-width: calc(100% - 32px);
      text-align: center;
    }

    /* ── QR Code — desktop only ── */
    .dialog-qr {
      display: none;
      margin: 12px auto 4px;
      padding: 8px;
      background: #fff;
      border-radius: 8px;
      width: 160px; height: 160px;
    }
    .dialog-qr img {
      width: 100%; height: 100%;
      image-rendering: pixelated;
    }
    .dialog-qr-tip {
      display: none;
      font-size: 12px; color: var(--weui-FG-2);
      margin-bottom: 8px;
    }
    @media (min-width: 600px) {
      .dialog-qr, .dialog-qr-tip { display: block; }
      .dialog { width: 380px; }
    }
    .dialog-header { padding: 32px 24px 16px; }
    .dialog-title-text {
      font-size: 17px; font-weight: 700;
      color: var(--weui-FG-0);
    }
    .dialog-body {
      padding: 0 24px; margin-bottom: 32px;
      font-size: 17px; color: var(--weui-FG-1);
      word-wrap: break-word;
    }
    .dialog-code {
      background: var(--weui-BG-3); padding: 14px;
      border-radius: 8px;
      font-family: 'SF Mono', Menlo, Monaco, 'Courier New', monospace;
      font-size: 14px; color: var(--weui-FG-0);
      margin-bottom: 12px; word-break: break-all;
      user-select: all;
    }
    .dialog-tip { font-size: 14px; color: var(--weui-FG-1); }

    .dialog-footer {
      display: flex; position: relative;
    }
    .dialog-footer::before {
      content: ""; position: absolute; left: 0; top: 0; right: 0;
      height: 1px; border-top: 1px solid var(--weui-DIALOG-LINE-COLOR);
      transform-origin: 0 0; transform: scaleY(.5);
    }
    .dialog-btn {
      flex: 1; padding: 16px 0;
      font-size: 17px; font-weight: 700;
      color: var(--weui-LINK);
      border: none; background: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }
    .dialog-btn:active { background: var(--weui-BG-COLOR-ACTIVE); }
    .dialog-btn + .dialog-btn::before {
      content: ""; position: absolute; left: 0; top: 0; bottom: 0;
      width: 1px; border-left: 1px solid var(--weui-DIALOG-LINE-COLOR);
      transform-origin: 0 0; transform: scaleX(.5);
    }
    .dialog-btn-cancel { color: var(--weui-FG-1); }
    .dialog-btn-primary-action { color: var(--weui-LINK); }

    /* ── Half-Screen Dialog ── */
    .half-screen-dialog {
      position: fixed; left: 0; right: 0; bottom: 0;
      z-index: 5001; background: var(--weui-BG-2);
      border-radius: 12px 12px 0 0;
      padding: 32px 24px;
      padding-bottom: calc(32px + env(safe-area-inset-bottom, 0px));
      animation: slideUp .3s ease-out;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to { transform: translateY(0); }
    }
    .toast-icon {
      width: 48px; height: 48px; border-radius: 50%;
      background: var(--weui-BRAND); color: #fff;
      font-size: 28px; margin: 0 auto 16px;
      display: flex; align-items: center; justify-content: center;
    }
    .toast-title {
      font-size: 17px; font-weight: 700;
      color: var(--weui-FG-0); text-align: center;
      margin-bottom: 8px;
    }
    .toast-desc {
      font-size: 14px; color: var(--weui-FG-1);
      text-align: center; margin-bottom: 24px;
    }
    .toast-btn {
      display: block; width: 184px; margin: 0 auto;
      padding: 12px 24px;
      background: var(--weui-BRAND); color: #fff;
      border: none; border-radius: 8px;
      font-size: 17px; font-weight: 500;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
      position: relative;
    }
    .toast-btn:active::before {
      content: ""; position: absolute; inset: 0;
      background: rgba(0,0,0,.1); border-radius: 8px;
    }

    /* ── Footer ── */
    .page-footer {
      padding: 16px 16px 32px;
      padding-bottom: calc(32px + env(safe-area-inset-bottom, 0px));
      text-align: center;
    }
    .footer-text { font-size: 12px; color: var(--weui-FG-2); }
    .footer-links { margin-top: 8px; }
    .footer-links a {
      margin: 0 8px; font-size: 14px;
      color: var(--weui-LINK); text-decoration: none;
    }
    .footer-links a:active { opacity: .5; }

    /* ── A11y ── */
    .sr-only {
      position: absolute; width: 1px; height: 1px;
      padding: 0; margin: -1px; overflow: hidden;
      clip: rect(0,0,0,0); white-space: nowrap; border: 0;
    }
  `;

  @state()
  private covers: Cover[] = [
    // ── Direct-claim covers (with receiveUri) — alphabetical ──
    { title: 'Eastman', url: 'https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_rvdPRg6u0eB&check_type=1', receiveUri: 'NU_rvdPRg6u0eB', status: 'available' },
    { title: 'HKT香港电讯马年限定', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_fug8F1m2WNA&check_type=2#wechat_redirect', receiveUri: 'NU_fug8F1m2WNA', status: 'available' },
    { title: 'MCM×烟花玩偶马', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_vH6FBRTlDPB&GongZhongHao=jabikj&check_type=2#wechat_redirect', receiveUri: 'NU_vH6FBRTlDPB', status: 'available' },
    { title: 'Miffy 米菲', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_d6X5zdxGiKD&check_type=2#wechat_redirect', receiveUri: 'NU_d6X5zdxGiKD', status: 'available' },
    { title: 'NBA全明星', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_mq08BwQQC7E&check_type=2#wechat_redirect', receiveUri: 'NU_mq08BwQQC7E', status: 'available' },
    { title: 'OPPO×小小财神', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_nWvNx2Dg3WS&check_type=2#wechat_redirect', receiveUri: 'NU_nWvNx2Dg3WS', status: 'available' },
    { title: 'Qeelin麒麟', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_k3yFjmOCE8N&GongZhongHao=jabikj&check_type=2#wechat_redirect', receiveUri: 'NU_k3yFjmOCE8N', status: 'available' },
    { title: 'TOPTOY×Mochi', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_iveP9DbpE9H&GongZhongHao=jabikj&check_type=2#wechat_redirect', receiveUri: 'NU_iveP9DbpE9H', status: 'available' },
    { title: 'TOPTOY×美乐蒂', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_wuIzRJFvCyZ&GongZhongHao=jabikj&check_type=2#wechat_redirect', receiveUri: 'NU_wuIzRJFvCyZ', status: 'available' },
    { title: 'TOPTOY半人鱼', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_jHG461ucpnS&check_type=2#wechat_redirect', receiveUri: 'NU_jHG461ucpnS', status: 'available' },
    { title: 'Zerox马年大吉', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_gFZZlwFhupC&check_type=2#wechat_redirect', receiveUri: 'NU_gFZZlwFhupC', status: 'available' },
    { title: '三丽鸥', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_zM4mpkIoN0M&check_type=2#wechat_redirect', receiveUri: 'NU_zM4mpkIoN0M', status: 'available' },
    { title: '三丽鸥帕恰狗', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_pG4WJFYL5KX&check_type=2#wechat_redirect', receiveUri: 'NU_pG4WJFYL5KX', status: 'available' },
    { title: '三枪x旋转木马 动态', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_tIxL2ftTXyB&GongZhongHao=jabikj&check_type=2#wechat_redirect', receiveUri: 'NU_tIxL2ftTXyB', status: 'available' },
    { title: '哔哩哔哩×拜年纪兽耳萌娘', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_uC4A0GTJ3KJ&GongZhongHao=jabikj&check_type=2#wechat_redirect', receiveUri: 'NU_uC4A0GTJ3KJ', status: 'available' },
    { title: '好想来 动态可爱', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_kj1W5PvWQSM&check_type=2#wechat_redirect', receiveUri: 'NU_kj1W5PvWQSM', status: 'available' },
    { title: '姆明家族', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_uoSZQQ2RLlE&check_type=2#wechat_redirect', receiveUri: 'NU_uoSZQQ2RLlE', status: 'available' },
    { title: '宝马中国', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_r9eQ9LXJePW&GongZhongHao=jabikj&check_type=2#wechat_redirect', receiveUri: 'NU_r9eQ9LXJePW', status: 'available' },
    { title: '小粉马', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_ygMZlgd0YYT&check_type=2#wechat_redirect', receiveUri: 'NU_ygMZlgd0YYT', status: 'available' },
    { title: '小米汽车×新SU7', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_rThj99OeRIT&check_type=2#wechat_redirect', receiveUri: 'NU_rThj99OeRIT', status: 'available' },
    { title: '梦幻飞马 动态好看', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?combinereceiveuri=53ZBH14AK0W0IptU&check_type=1#wechat_redirect', receiveUri: '53ZBH14AK0W0IptU', status: 'available' },
    { title: '植物大战僵尸 动态', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_bBTc3fwLk5K&GongZhongHao=jabikj&check_type=2#wechat_redirect', receiveUri: 'NU_bBTc3fwLk5K', status: 'available' },
    { title: '泰柯茶园 动态', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?combinereceiveuri=CI2AUIJWbpj7OBR6&check_type=2#wechat_redirect', receiveUri: 'CI2AUIJWbpj7OBR6', status: 'available' },
    { title: '海底捞×小马宝莉', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_gFls3rq5Q4L&check_type=2#wechat_redirect', receiveUri: 'NU_gFls3rq5Q4L', status: 'available' },
    { title: '爷爷不泡茶 动态', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_aiAdYW5wC8R&check_type=2#wechat_redirect', receiveUri: 'NU_aiAdYW5wC8R', status: 'available' },
    { title: '生生不息×流星粉马 动态', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_jlyeac25XUD&GongZhongHao=jabikj&check_type=2#wechat_redirect', receiveUri: 'NU_jlyeac25XUD', status: 'available' },
    { title: '立白×迪丽热巴', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_ltamksSG1YO&check_type=2#wechat_redirect', receiveUri: 'NU_ltamksSG1YO', status: 'available' },
    { title: '给你红包 动态', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_hGYpkhsXLbW&check_type=2#wechat_redirect', receiveUri: 'NU_hGYpkhsXLbW', status: 'available' },
    { title: '腾讯安全', url: 'https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_jODPFJw8CcA&check_type=1', receiveUri: 'NU_jODPFJw8CcA', status: 'available' },
    { title: '腾讯电竞×十周年企鹅骑马', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_m4w93lDBwVN&check_type=2#wechat_redirect', receiveUri: 'NU_m4w93lDBwVN', status: 'available' },
    { title: '茉莉奶白×奔腾的小金马 动态', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_yYZUZHm93QK&check_type=1&sessionid=1422619639', receiveUri: 'NU_yYZUZHm93QK', status: 'available' },
    { title: '荣耀HONOR×肖战', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_xodOj9docIM&check_type=1', receiveUri: 'NU_xodOj9docIM', status: 'available' },
    { title: '荣耀HONOR×金马 动态', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_raT8aUpXJHG&check_type=1&sessionid=1367090601', receiveUri: 'NU_raT8aUpXJHG', status: 'available' },
    { title: '蒙牛×胖牛牛', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_oXfpesdUcIC&GongZhongHao=jabikj&check_type=2#wechat_redirect', receiveUri: 'NU_oXfpesdUcIC', status: 'available' },
    { title: '蒙牛x拿去花', url: 'https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_nVrZMt3CJ8B&check_type=1', receiveUri: 'NU_nVrZMt3CJ8B', status: 'available' },
    { title: '超级洞洞乐 动态', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_hPpV32vdd4E&check_type=2#wechat_redirect', receiveUri: 'NU_hPpV32vdd4E', status: 'available' },
    { title: '转转×新年装满财运', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_h6JBc4ONneY&check_type=2#wechat_redirect', receiveUri: 'NU_h6JBc4ONneY', status: 'available' },
    { title: '马上发达 动态', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_o9WPVFWYd6N&check_type=2#wechat_redirect', receiveUri: 'NU_o9WPVFWYd6N', status: 'available' },
    { title: '马上有钱 可爱', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?WeiXinGongZhongHao=jabizb&receiveuri=NU_dsTLimpbeRS&GongZhongHao=jabikj&check_type=2#wechat_redirect', receiveUri: 'NU_dsTLimpbeRS', status: 'available' },
    { title: '鸿星尔克', url: 'https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_nOsPn2UxYjI&check_type=1', receiveUri: 'NU_nOsPn2UxYjI', status: 'available' },
    { title: '花知晓×可爱小兔', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_dXoUJh9HuSQ&check_type=1', receiveUri: 'NU_dXoUJh9HuSQ', status: 'available' },
    { title: '花知晓×邦尼花园', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_gcTKnkyFhRN&check_type=1', receiveUri: 'NU_gcTKnkyFhRN', status: 'available' },
    { title: '英雄联盟', url: 'https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_eQhx6ux150E&check_type=1', receiveUri: 'NU_eQhx6ux150E', status: 'available' },
    { title: '英雄联盟手游', url: 'https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_sOLOA2hbTHH&check_type=1', receiveUri: 'NU_sOLOA2hbTHH', status: 'available' },
    { title: '英雄联盟赛事', url: 'https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_cYkv7SdseRA&check_type=1', receiveUri: 'NU_cYkv7SdseRA', status: 'available' },
    { title: '零跑汽车', url: 'https://szsupport.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_gAKt6KP1BcP&check_type=2', receiveUri: 'NU_gAKt6KP1BcP', status: 'available' },
    { title: '风行x财运长行 全异形', url: 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_hgemgZPYiCZ&check_type=2#wechat_redirect', receiveUri: 'NU_hgemgZPYiCZ', status: 'available' },

    // ── Article-claim covers (need to visit article) — alphabetical ──
    { title: 'Horse 成双 动态', url: 'https://mp.weixin.qq.com/s/OIBv9GT6XBx1fd_LbtEQWg', status: 'available' },
    { title: 'PinkBear 皮可熊 动态好看', url: 'https://mp.weixin.qq.com/s/OFhHLFk-A9lZqRRV67-JVw', status: 'available' },
    { title: '一汽红旗 动态', url: 'https://mp.weixin.qq.com/s/E-X-rg1H824LksKfAdx7WA', status: 'available' },
    { title: '三一集团', url: 'https://mp.weixin.qq.com/s/3tIjInvNeT6s5v1rwwfKRQ', status: 'available' },
    { title: '保时捷汽车Porsche×彩色骏马', url: 'https://mp.weixin.qq.com/s?__biz=Mzg4MDAzNDk3NQ==&mid=2247576310&idx=1&sn=f8d1bab755861e5a3d25a443e3422eb1&scene=21#wechat_redirect', status: 'available' },
    { title: '可比克', url: 'https://mp.weixin.qq.com/s/ahMecUBWtyfq0VjhVG1z2A', status: 'available' },
    { title: '大众汽车×马力全开', url: 'https://mp.weixin.qq.com/s?__biz=MzA3MDA0NTEzMw==&mid=2652768932&idx=1&sn=3f652f0636ad23acaf7364e29f5584c9&scene=21#wechat_redirect', status: 'available' },
    { title: '天助', url: 'https://mp.weixin.qq.com/s/B2gZzki1JHxmhnyP4oJQQg', status: 'available' },
    { title: '小米安全', url: 'https://mp.weixin.qq.com/s/nMHbyg0jui02T4R1EBdpdw', status: 'available' },
    { title: '幸运娃娃机 动态', url: 'https://mp.weixin.qq.com/s/zHk2tLRNzTM48vhs0qjW6w', status: 'available' },
    { title: '招商 3 款', url: 'https://mp.weixin.qq.com/s/Ght5vCVVy0TE1un5axAXqg', status: 'available' },
    { title: '森歌x马上有钱 动态', url: 'https://mp.weixin.qq.com/s/wyGuVJ3PLG4xn8iDUkanwQ', status: 'available' },
    { title: '科研人 活泼风', url: 'https://mp.weixin.qq.com/s/v47Dt2ySi6Zf2MOTn3R76g', status: 'available' },
    { title: '脆脆鲨', url: 'https://mp.weixin.qq.com/s/GivGqBOgVf4OdBL-fhaSCA', status: 'available' },
    { title: '腾讯学堂xHorse发生', url: 'https://mp.weixin.qq.com/s/OOPt1tCaSsFzdHBhOJm51g', status: 'available' },
    { title: '超自然行动 3个', url: 'https://mp.weixin.qq.com/s/qtn81vQkNF0wdCs7SGP_ow', status: 'available' },
    { title: '金铲铲之战 2个', url: 'https://mp.weixin.qq.com/s/ry9U2lRdv0cRIVsmE2Twug', status: 'available' },
    { title: '醒狮熊猫游戏机 动态', url: 'https://mp.weixin.qq.com/s/yzX6nvQCKJPB_RoA-VyjyA', status: 'available' },
    { title: '驻粤办', url: 'https://mp.weixin.qq.com/s/LNxXDkYTLzWbxkpRGe8nmw', status: 'available' },
    { title: '豆本豆×喜羊羊与灰太狼', url: 'https://mp.weixin.qq.com/s?__biz=MzIyNDU1MjkyNw==&mid=2247493037&idx=1&sn=c7fea410d87500e4ed9702b2bae691ed&scene=21#wechat_redirect', status: 'available' },
    { title: '黑暗破坏神', url: 'https://mp.weixin.qq.com/s/TF39ORRwU6goi1x2GfG84Q', status: 'available' },
  ];

  @state()
  private selectedCover: Cover | null = null;

  @state()
  private showDialog = false;

  @state()
  private showToast = false;

  @state()
  private isWeChat = false;

  connectedCallback() {
    super.connectedCallback();
    this.isWeChat = navigator.userAgent.toLowerCase().includes('micromessenger');
  }

  private handleCoverClick(cover: Cover) {
    if (cover.status === 'claimed') return;

    if (this.isWeChat) {
      window.location.href = cover.url;
      return;
    }

    // Always show dialog — for both receiveUri and article covers
    this.selectedCover = cover;
    this.showDialog = true;
  }

  private async copyCode() {
    if (this.selectedCover?.receiveUri) {
      try {
        await navigator.clipboard.writeText(this.selectedCover.receiveUri);
      } catch {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = this.selectedCover.receiveUri;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      this.showDialog = false;
      this.showToast = true;
      setTimeout(() => { this.showToast = false; }, 3000);
    }
  }

  private generateQR(url: string): string {
    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    // Create SVG data URL for crisp rendering
    const cellSize = 4;
    const margin = 2;
    const count = qr.getModuleCount();
    const size = count * cellSize + margin * 2 * cellSize;
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">`;
    svg += `<rect width="${size}" height="${size}" fill="#fff"/>`;
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          svg += `<rect x="${(c + margin) * cellSize}" y="${(r + margin) * cellSize}" width="${cellSize}" height="${cellSize}"/>`;
        }
      }
    }
    svg += '</svg>';
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }

  private goToArticle() {
    if (this.selectedCover) {
      window.open(this.selectedCover.url, '_blank');
      this.showDialog = false;
    }
  }

  private goToRedeem() {
    window.open('https://support.weixin.qq.com/cgi-bin/mmsupport-bin/newreadtemplate?t=page/hongbao/exchange.html#wechat_redirect', '_blank');
  }

  private closeDialog() {
    this.showDialog = false;
  }

  render() {
    return html`
      <div class="page-wrapper">
        <div class="page-container">
          <!-- Semantic Header -->
          <header class="page-header" role="banner">
            <h1 class="page-title">微信红包封面领取</h1>
            <nav role="navigation" aria-label="快捷操作">
              <button
                class="redeem-btn"
                @click=${this.goToRedeem}
                aria-label="前往微信官方红包封面兑换页面"
              >
                官方兑换页
              </button>
            </nav>
          </header>

          <!-- Main Content -->
          <main role="main">
            <h2 class="sr-only">可领取的红包封面列表</h2>
            <div class="covers-grid" role="list" aria-label="红包封面列表">
              ${this.covers.map((cover) => html`
                <article
                  class="cover-item ${cover.status === 'claimed' ? 'claimed' : ''}"
                  role="listitem"
                  @click=${() => this.handleCoverClick(cover)}
                  tabindex="0"
                  aria-label="红包封面：${cover.title}${cover.status === 'claimed' ? '（已领完）' : ''}"
                  @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.handleCoverClick(cover); } }}
                >
                  <div class="cover-thumbnail ${cover.status === 'claimed' ? 'claimed' : ''}"
                    aria-hidden="true">
                    🧧
                  </div>
                  <div class="cover-title ${cover.status === 'claimed' ? 'claimed' : ''}">
                    ${cover.title}
                  </div>
                  ${cover.status === 'claimed' ? html`<div class="status-badge" aria-label="已领完">已领完</div>` : ''}
                  ${!cover.receiveUri && cover.status !== 'claimed' ? html`<span class="article-badge" aria-label="需前往文章领取">需前往文章领取</span>` : ''}
                </article>
              `)}
            </div>
          </main>

          <!-- Footer -->
          <footer class="page-footer" role="contentinfo">
            <p class="footer-text">
              共 ${this.covers.length} 个红包封面 · 在微信中打开可直接领取
            </p>
            <div class="footer-links">
              <a href="https://hongbao.mcpplca.net"
                 target="_blank">
                MCP星球
              </a>
            </div>
          </footer>
        </div>

        <!-- Dialog -->
        ${this.showDialog && this.selectedCover ? html`
          <div class="dialog-mask" @click=${this.closeDialog} aria-hidden="true"></div>
          <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
            <div class="dialog-header">
              <strong class="dialog-title-text" id="dialog-title">${this.selectedCover.title}</strong>
            </div>
            ${this.selectedCover.receiveUri ? html`
              <!-- Code dialog -->
              <div class="dialog-body">
                <div class="dialog-qr">
                  <img src=${this.generateQR(this.selectedCover.url)} alt="扫码领取">
                </div>
                <p class="dialog-qr-tip">手机扫码直接领取</p>
                <div class="dialog-code" aria-label="序列号">${this.selectedCover.receiveUri}</div>
                <p class="dialog-tip">点击"复制序列号"后，前往官方兑换页面粘贴兑换</p>
              </div>
              <div class="dialog-footer">
                <button class="dialog-btn dialog-btn-cancel" @click=${this.closeDialog}>取消</button>
                <button class="dialog-btn dialog-btn-primary-action" @click=${this.copyCode}>复制序列号</button>
              </div>
            ` : html`
              <!-- Article dialog -->
              <div class="dialog-body">
                <div class="dialog-qr">
                  <img src=${this.generateQR(this.selectedCover.url)} alt="扫码领取">
                </div>
                <p class="dialog-qr-tip">手机扫码直接领取</p>
                <p class="dialog-tip">该封面需要前往公众号文章领取，点击下方按钮跳转</p>
              </div>
              <div class="dialog-footer">
                <button class="dialog-btn dialog-btn-cancel" @click=${this.closeDialog}>取消</button>
                <button class="dialog-btn dialog-btn-primary-action" @click=${this.goToArticle}>前往领取</button>
              </div>
            `}
          </div>
        ` : ''}

        <!-- Toast / Success Sheet -->
        ${this.showToast ? html`
          <div class="toast-mask" @click=${() => { this.showToast = false; }}></div>
          <div class="half-screen-dialog" role="alert" aria-live="assertive">
            <div class="toast-icon" aria-hidden="true">✓</div>
            <div class="toast-title">序列号已复制</div>
            <div class="toast-desc">请前往官方兑换页面粘贴序列号进行兑换</div>
            <button class="toast-btn" @click=${this.goToRedeem}>前往兑换</button>
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'covers-app': CoversApp;
  }
}
