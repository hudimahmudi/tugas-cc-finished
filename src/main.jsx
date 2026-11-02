import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const inlineStyles = String.raw`:root {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color: #292534;
  background: #faf9fc;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-optical-sizing: auto;
  font-weight: 400;
}

* { box-sizing: border-box; }
body { margin: 0; min-width: 320px; min-height: 100vh; font-size: 18px; }
button, input, select { font: inherit; }
button { cursor: pointer; }
button:focus-visible, input:focus-visible, select:focus-visible, a:focus-visible { outline: 3px solid #c9b9fc; outline-offset: 2px; }

.app-shell { min-height: 100vh; }
.sidebar { position: fixed; inset: 0 auto 0 0; z-index: 5; display: flex; flex-direction: column; width: 248px; padding: 28px 18px 16px; background: #fff; border-right: 1px solid #eeeaf2; }
.brand { display: inline-flex; align-items: center; gap: 9px; color: #edeaf7; font-size: 23px; font-weight: 800; letter-spacing: -1px; text-decoration: none; }
.brand-mark { display: grid; width: 30px; height: 30px; place-items: center; border-radius: 10px; color: #fff; background: #05030c; font-family: Georgia, serif; font-size: 26px; font-style: italic; line-height: 1; }
.brand-dot { color: #eeebf8; }
.workspace-switcher { display: flex; align-items: center; gap: 10px; margin: 34px 0 31px; padding: 11px 10px; border: 1px solid #f0edf4; border-radius: 11px; }
.workspace-icon { display: grid; width: 34px; height: 34px; place-items: center; border-radius: 9px; color: #755ce2; background: #f0edff; }
.workspace-copy, .profile-copy { display: grid; gap: 2px; flex: 1; }
.workspace-copy strong, .profile-copy strong { font-size: 14px; }
.workspace-copy small, .profile-copy small { color: #9994a3; font-size: 12px; }
.chevron { color: #9994a3; }
.menu-label { margin: 0 0 11px 11px; color: #a19baa; font-size: 12px; font-weight: 700; letter-spacing: 1.2px; }
.side-navigation { display: grid; gap: 5px; }
.nav-link, .help-link { display: flex; align-items: center; gap: 12px; width: 100%; min-height: 42px; padding: 0 12px; border: 0; border-radius: 9px; color: #777181; background: transparent; text-align: left; font-size: 14px; font-weight: 550; }
.nav-link:hover, .help-link:hover { color: #6245d1; background: #f8f6ff; }
.nav-link.active { color: #704fe4; background: #f1edff; font-weight: 700; }
.nav-icon { display: grid; width: 19px; place-items: center; font-size: 19px; }
.nav-count { margin-left: auto; color: #8b7cbd; font-size: 12px; }
.sidebar-spacer { flex: 1; }
.upgrade-card { position: relative; overflow: hidden; padding: 16px 14px 14px; border: 1px solid #eee9ff; border-radius: 12px; background: linear-gradient(145deg, #faf8ff, #f5f2ff); }
.upgrade-sparkle { position: absolute; top: 12px; right: 13px; color: #8e70f0; }
.upgrade-card strong { color: #514178; font-size: 12px; }
.upgrade-card p { margin: 7px 0 12px; color: #89839a; font-size: 12px; line-height: 1.55; }
.upgrade-card button { padding: 0; border: 0; color: #765ae0; background: transparent; font-size: 12px; font-weight: 700; }
.upgrade-card button span { padding-left: 5px; }
.help-link { margin: 15px 0 8px; padding-left: 9px; }
.sidebar-profile { display: flex; align-items: center; gap: 9px; padding: 13px 3px 0; border: 0; border-top: 1px solid #f0edf2; color: #353140; background: transparent; text-align: left; }
.avatar { display: grid; width: 31px; height: 31px; flex: 0 0 auto; place-items: center; border-radius: 50%; color: #7556da; background: #eee8ff; font-size: 14px; font-weight: 700; }
.more-icon { color: #928c99; font-size: 12px; letter-spacing: 1px; }

.main-area { min-height: 100vh; margin-left: 248px; padding: 0 42px 40px; }
.topbar { display: flex; align-items: center; justify-content: space-between; min-height: 101px; border-bottom: 1px solid #eeeaf1; }
.eyebrow { margin: 0 0 5px; color: #aaa4b2; font-size: 12px; font-weight: 700; letter-spacing: 1.1px; }
.topbar-actions { display: flex; align-items: center; gap: 19px; }
.icon-button { position: relative; width: 35px; height: 35px; border: 1px solid #eeeaf1; border-radius: 10px; color: #787181; background: #fff; font-size: 21px; }
.notification-button span { position: absolute; top: 7px; right: 8px; width: 5px; height: 5px; border-radius: 50%; background: #f28391; }
.profile-button { display: flex; align-items: center; gap: 9px; padding: 0; border: 0; color: #4a4553; background: transparent; font-size: 12px; font-weight: 650; }
.profile-button .avatar { width: 33px; height: 33px; }
.profile-button .chevron { margin-left: 2px; }
.page-content { max-width: 1320px; margin: 27px auto 0; }
.welcome-banner { position: relative; display: flex; min-height: 210px; overflow: hidden; align-items: center; justify-content: space-between; padding: 28px 40px; border-radius: 16px; color: #fff; background: linear-gradient(112deg, #7557dc 0%, #8769e9 55%, #a78df1 100%); }
.welcome-copy { z-index: 1; max-width: 530px; }
.banner-tag { display: inline-block; margin-bottom: 10px; padding: 5px 8px; border: 1px solid #ffffff4d; border-radius: 5px; color: #f4efff; font-size: 12px; font-weight: 700; letter-spacing: 1px; }
.welcome-copy h2 { max-width: 470px; margin: 0; font-size: 25px; font-weight: 700; letter-spacing: -.55px; line-height: 1.35; }
.welcome-copy p { margin: 8px 0 16px; color: #eae3ff; font-size: 12px; }
.button-light, .button-primary, .button-outline { display: inline-flex; min-height: 36px; align-items: center; justify-content: center; gap: 7px; padding: 0 14px; border-radius: 8px; font-size: 12px; font-weight: 700; transition: transform .15s, box-shadow .15s; }
.button-light:hover, .button-primary:hover, .button-outline:hover { transform: translateY(-1px); }
.button-light { border: 0; color: #694cc6; background: #fff; box-shadow: 0 4px 12px #5036ad30; }
.button-primary { border: 1px solid #775add; color: #fff; background: #775add; }
.button-primary:hover { background: #674bc9; box-shadow: 0 5px 15px #7356d533; }
.button-outline { border: 1px solid #eae6ef; color: #625b6d; background: #fff; }
.button-outline span { color: #8570d1; }
.banner-art { position: relative; width: 280px; height: 190px; flex: 0 0 280px; }
.art-sun { position: absolute; top: 5px; right: 62px; color: #ffe6a3; font-size: 30px; }
.art-card { position: absolute; display: grid; place-content: center; width: 134px; height: 137px; border: 5px solid #ffffff4f; border-radius: 12px; box-shadow: 0 10px 25px #4d36a450; transform: rotate(8deg); }
.art-card-back { top: 25px; left: 74px; color: #997de8; background: #eee7ff; font-size: 50px; transform: rotate(-11deg); }
.art-card-front { top: 34px; left: 106px; gap: 8px; color: #514274; background: #fffaf0; transform: rotate(8deg); }
.art-card-front span { color: #988aaf; font-size: 12px; font-weight: 700; letter-spacing: .7px; }
.art-card-front b { font-family: Georgia, serif; font-size: 17px; line-height: 1.35; }
.art-card-front i { color: #b39cf0; font-size: 12px; font-style: normal; letter-spacing: 2px; }
.art-plant { position: absolute; right: 5px; bottom: 16px; color: #d5c9ff; font-size: 68px; transform: rotate(-25deg); }
.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 18px; }
.stat-card { display: flex; min-height: 84px; align-items: center; gap: 12px; padding: 15px 17px; border: 1px solid #eeeaf1; border-radius: 12px; background: #fff; }
.stat-icon { display: grid; width: 37px; height: 37px; flex: 0 0 auto; place-items: center; border-radius: 10px; font-size: 18px; font-weight: 700; }
.stat-purple { color: #7557df; background: #f1edff; }
.stat-yellow { color: #d39d37; background: #fff6df; }
.stat-green { color: #53a582; background: #e9f7f0; }
.stat-text { display: grid; flex: 1; gap: 5px; }
.stat-text span { color: #898392; font-size: 12px; }
.stat-text strong { color: #302c39; font-size: 22px; line-height: 1; }
.stat-trend, .stat-note { align-self: flex-end; padding-bottom: 4px; color: #67a987; font-size: 12px; white-space: nowrap; }
.stat-note { color: #aaa4b0; }
.content-panel { padding: 20px; border: 1px solid #eeeaf1; border-radius: 12px; background: #fff; }
.section-heading, .content-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 15px; }
.section-heading h2, .content-toolbar h2 { margin: 0; color: #342f3e; font-size: 15px; font-weight: 700; }
.section-heading p, .content-toolbar p { margin: 5px 0 0; color: #9b96a2; font-size: 12px; }
.content-panel > .section-heading .button-outline { min-height: 31px; font-size: 12px; }
.content-table { width: 100%; border-collapse: collapse; text-align: left; }
.content-table thead th { padding: 16px 10px 10px; border-bottom: 1px solid #f0edf2; color: #a7a1ad; font-size: 12px; font-weight: 700; letter-spacing: .7px; white-space: nowrap; }
.content-table thead th:first-child, .content-table tbody td:first-child { padding-left: 0; }
.content-table tbody td { padding: 12px 10px; border-bottom: 1px solid #f3f0f4; color: #716b7b; font-size: 12px; white-space: nowrap; }
.content-table tbody tr:last-child td { border-bottom: 0; }
.table-title { display: flex; min-width: 240px; align-items: center; gap: 10px; }
.table-title > span:last-child { display: grid; gap: 4px; }
.table-title strong { max-width: 290px; overflow: hidden; color: #484352; font-size: 12px; font-weight: 650; text-overflow: ellipsis; }
.table-title small { color: #aaa4b0; font-size: 12px; }
.platform-icon { display: grid; width: 30px; height: 30px; flex: 0 0 auto; place-items: center; border-radius: 9px; font-size: 14px; font-weight: 800; }
.platform-youtube { color: #ed5a60; background: #fff0f0; }
.platform-instagram { color: #c15d9b; background: #fff0f6; }
.platform-tiktok { color: #363240; background: #f1f0f2; }
.platform-linkedin { color: #337db9; background: #edf6ff; font-size: 12px; }
.status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 5px 8px; border-radius: 20px; font-size: 12px; }
.status-badge i { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
.status-idea { color: #8365d2; background: #f2edff; }
.status-writing { color: #bd8a32; background: #fff7e5; }
.status-production { color: #428da9; background: #eaf7fb; }
.status-editing { color: #c37451; background: #fff0e9; }
.status-ready { color: #4c9b74; background: #eaf8f0; }
.status-published { color: #5474bd; background: #edf2ff; }
.row-menu { border: 0; color: #a7a1ae; background: transparent; font-size: 12px; letter-spacing: 1px; }
.content-panel > .section-heading { margin-bottom: 12px; }
.table-scroll { overflow-x: auto; }
.bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px; }
.goal-panel { min-height: 143px; }
.goal-emoji { font-size: 21px; }
.goal-progress-row { display: flex; justify-content: space-between; margin-top: 20px; color: #625c6b; font-size: 12px; }
.goal-progress-row span { color: #795be0; font-weight: 700; }
.progress-track { height: 6px; overflow: hidden; margin-top: 9px; border-radius: 8px; background: #f0edf5; }
.progress-track span { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #7759df, #a992f6); }
.goal-helper { margin-top: 9px; color: #a09ba7; font-size: 12px; }
.tip-panel { display: flex; align-items: flex-start; gap: 13px; min-height: 143px; background: #fffcf5; }
.tip-icon { display: grid; width: 34px; height: 34px; flex: 0 0 auto; place-items: center; border-radius: 10px; background: #fff1c9; font-size: 18px; }
.tip-label { color: #c49b44; font-size: 12px; font-weight: 800; letter-spacing: .8px; }
.tip-panel h2 { margin: 6px 0; color: #534633; font-size: 14px; }
.tip-panel p { max-width: 280px; color: #958a78; font-size: 12px; line-height: 1.6; }
.empty-state { display: grid; justify-items: center; gap: 8px; padding: 36px 15px; color: #9993a2; text-align: center; }
.empty-state > span { color: #8b70e5; font-size: 25px; }
.empty-state strong { color: #494454; font-size: 14px; }
.empty-state p { margin: 0; font-size: 12px; }
.empty-state .text-button { margin-top: 3px; }

.content-page-heading { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin: 5px 0 19px; }
.content-page-heading h2 { margin: 0; color: #302c39; font-size: 25px; letter-spacing: -.6px; }
.content-page-heading > div > p:last-child { margin: 6px 0 0; color: #8f8997; font-size: 12px; }
.pipeline-summary { display: flex; gap: 28px; margin-bottom: 16px; padding: 15px 18px; border: 1px solid #eeeaf1; border-radius: 11px; background: #fff; }
.pipeline-summary > div { display: flex; align-items: center; gap: 8px; color: #716b79; font-size: 12px; }
.pipeline-summary strong { margin-left: 3px; color: #383342; }
.summary-marker { width: 7px; height: 7px; border-radius: 50%; }
.summary-purple { background: #886ce3; }.summary-yellow { background: #e9b34f; }.summary-green { background: #61b188; }
.all-content-panel { padding-bottom: 6px; }
.content-toolbar { margin-bottom: 13px; }
.filters { display: flex; align-items: center; gap: 8px; }
.search-box { display: flex; width: 185px; height: 34px; align-items: center; gap: 7px; padding: 0 9px; border: 1px solid #ece8f0; border-radius: 7px; color: #9992a2; }
.search-box span { font-size: 20px; }
.search-box input { width: 100%; border: 0; outline: 0; color: #4a4552; background: transparent; font-size: 12px; }
.filters select, .content-form select, .content-form input { height: 36px; padding: 0 10px; border: 1px solid #ece8f0; border-radius: 7px; color: #5d5667; background: #fff; font-size: 12px; }
.filters select { height: 34px; }
.priority-label { font-size: 12px; }
.priority-tinggi { color: #d66b70; }.priority-sedang { color: #ce9b3e; }.priority-rendah { color: #61a481; }
.status-select { max-width: 130px; height: 27px; padding: 0 7px; border: 0; border-radius: 18px; font-size: 12px; }

.modal-backdrop { position: fixed; inset: 0; z-index: 10; display: grid; overflow-y: auto; place-items: center; padding: 20px; background: #221c35a6; backdrop-filter: blur(3px); }
.content-modal { width: min(100%, 490px); padding: 25px; border-radius: 16px; background: #fff; box-shadow: 0 18px 60px #2119333b; }
.modal-heading { display: flex; justify-content: space-between; gap: 15px; }
.modal-kicker { color: #8369dc; font-size: 12px; font-weight: 800; letter-spacing: 1px; }
.modal-heading h2 { margin: 5px 0; color: #332e3d; font-size: 22px; }
.modal-heading p { margin: 0; color: #96909e; font-size: 12px; }
.modal-close { width: 30px; height: 30px; border: 0; border-radius: 8px; color: #8f8998; background: #f6f4f8; font-size: 22px; }
.content-form { display: grid; gap: 9px; margin-top: 20px; }
.content-form > label, .content-form .form-row label { margin-bottom: -4px; color: #5c5665; font-size: 12px; font-weight: 650; }
.content-form label span { color: #a39daa; font-weight: 400; }
.content-form > input { width: 100%; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 5px; }
.form-row > div { display: grid; gap: 8px; }
.form-row input, .form-row select { width: 100%; }
.modal-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 13px; }
.toast-message { position: fixed; right: 24px; bottom: 24px; z-index: 15; padding: 13px 18px; border: 1px solid #dcf0e4; border-radius: 10px; color: #347853; background: #f1fbf5; box-shadow: 0 8px 24px #2920391c; font-size: 14px; }

.auth-page { display: grid; min-height: 100vh; grid-template-columns: minmax(430px, 1fr) minmax(420px, .95fr); background: #fff; }
.auth-page:not(.login-page) { background-color: #1c1428; background-image: linear-gradient(135deg, #17112480, #32133766), url('/background.jpg'); background-position: center; background-size: cover; background-repeat: no-repeat; }
.auth-card { display: flex; width: min(100%, 520px); flex-direction: column; justify-content: center; margin: 0 auto; padding: 45px 64px; }
.auth-brand { align-self: flex-start; margin-bottom: 50px; }
.auth-heading { margin-bottom: 27px; }
.auth-emoji { display: grid; width: 42px; height: 42px; place-items: center; margin-bottom: 17px; border-radius: 12px; background: #f4f0ff; font-size: 21px; }
.auth-heading h1 { margin: 0 0 8px; color: #ece1e1; font-size: 26px; letter-spacing: -.6px; }
.auth-heading p { margin: 0; color: #ece1e1; font-size: 14px; line-height: 1.6; }
.auth-form { display: grid; gap: 9px; }
.auth-form > label:not(.remember-option), .label-row label { color: #f1ecf8; font-size: 12px; font-weight: 650; }
.auth-form > input { height: 42px; margin-bottom: 7px; padding: 0 12px; border: 1px solid #e8e4ec; border-radius: 8px; color: #494352; background: #fff; font-size: 12px; }
.auth-form > input::placeholder { color: #b4afba; }
.label-row { display: flex; align-items: center; justify-content: space-between; }
.text-button { padding: 0; border: 0; color: #f6f5f8; background: transparent; font-size: 12px; font-weight: 700; }
.remember-option { display: flex; align-items: center; gap: 7px; margin: 1px 0 11px; color: #77717f; font-size: 12px; }
.remember-option input { width: 14px; height: 14px; accent-color: #795ce0; }
.auth-submit { width: 100%; height: 42px; }
.auth-switch { margin: 22px 0 0; color: #f5f2fa; text-align: center; font-size: 12px; }
.auth-switch .text-button { margin-left: 3px; }
.auth-footnote { margin: 35px 0 0; color: #aaa5b0; text-align: center; font-size: 12px; line-height: 1.8; }
.auth-footnote a { color: #7660bd; text-decoration: none; }
.auth-side { position: relative; display: flex; overflow: hidden; align-items: center; justify-content: center; padding: 50px; color: #fff; background: linear-gradient(145deg, #7052d6 0%, #8f6be7 58%, #aa8cf1 100%); }
.auth-side-content { z-index: 1; max-width: 400px; }
.side-pill { display: inline-block; padding: 8px 11px; border: 1px solid #ffffff45; border-radius: 20px; color: #f1eaff; font-size: 12px; font-weight: 700; letter-spacing: .8px; }
.auth-side-content h2 { margin: 22px 0 13px; color: #fff; font-size: clamp(34px, 4vw, 49px); letter-spacing: -1.8px; line-height: 1.13; }
.auth-side-content > p { max-width: 340px; margin: 0; color: #ece4ff; font-size: 14px; line-height: 1.8; }
.auth-side-orb { position: absolute; border: 1px solid #ffffff20; border-radius: 50%; }
.orb-one { top: -105px; right: -84px; width: 430px; height: 430px; box-shadow: 0 0 0 35px #ffffff08, 0 0 0 75px #ffffff07; }
.orb-two { bottom: -235px; left: -130px; width: 380px; height: 380px; box-shadow: 0 0 0 30px #ffffff08; }
.side-decoration { position: absolute; color: #ffffff65; }
.decoration-one { top: 19%; right: 15%; font-size: 36px; }
.decoration-two { right: 22%; bottom: 17%; font-size: 30px; }
.side-quote { display: flex; align-items: center; gap: 12px; margin-top: 55px; color: #eee7ff; font-size: 12px; }
.quote-avatars { display: flex; padding-left: 4px; }
.quote-avatars span { display: grid; width: 26px; height: 26px; place-items: center; margin-left: -4px; border: 2px solid #9879e9; border-radius: 50%; color: #6449bc; background: #fff; font-size: 12px; font-weight: 700; }
.register-side .auth-side-content h2 { font-size: clamp(34px, 4vw, 46px); }
.mini-pipeline { display: flex; align-items: center; gap: 9px; margin-top: 45px; }
.mini-pipeline span { display: flex; align-items: center; gap: 7px; padding: 10px 12px; border: 1px solid #ffffff45; border-radius: 8px; background: #ffffff12; color: #fff; font-size: 12px; }
.mini-pipeline b { color: #e3d9ff; }
.mini-pipeline i { color: #e3d9ff; font-style: normal; }

.login-page { display: flex; align-items: center; justify-content: center; padding: 32px 20px; background-color: #1c1428; background-image: linear-gradient(135deg, #17112480, #32133766), url('/background.jpg'); background-position: center; background-size: cover; background-repeat: no-repeat; }
.login-page .login-card { width: min(100%, 440px); min-height: auto; padding: 42px; border: 1px solid #ffffff80; border-radius: 20px; background:2px solid rgba(0, 0, 0, 0,1); box-shadow: 0 24px 70px #120b2866; backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
.login-page .auth-brand { margin-bottom: 38px; }
.login-page .auth-heading { margin-bottom: 24px; }
.login-page .auth-heading h1 { font-size: 29px; letter-spacing: -.9px; }
.login-page .auth-heading p { font-size: 15px; }
.google-login-button { display: flex; width: 100%; height: 46px; align-items: center; justify-content: center; gap: 11px; border: 1px solid #ffffffb3; border-radius: 9px; color: #393442; background: #ffffffa6; font-size: 14px; font-weight: 650; transition: background .15s, border-color .15s; }
.google-login-button:hover { border-color: #d5d0df; background: #faf9fc; }
.google-login-button svg { width: 17px; height: 17px; }
.google-login-notice { margin: 10px 0 0; color: #7660bd; text-align: center; font-size: 12px; line-height: 1.5; }
.auth-divider { display: flex; align-items: center; gap: 13px; margin: 22px 0; color: #a19ba9; font-size: 12px; }
.auth-divider::before, .auth-divider::after { height: 1px; flex: 1; background: #756c7d55; content: ""; }
.login-page .auth-form { gap: 10px; }
.login-page .auth-form > label:not(.remember-option) { font-size: 14px; }
.login-page .auth-form > input { width: 100%; height: 46px; margin-bottom: 5px; padding: 0 13px; border: 1px solid #ffffff00; border-radius: 9px; background: #ffffffb3; font-size: 14px; }
.login-page .auth-submit { height: 46px; margin-top: 8px; color: #f9f7fd; border-radius: 9px; font-size: 14px; }
.login-page .auth-switch { margin-top: 22px; font-size: 14px; }
.login-page .auth-footnote { margin-top: 27px; font-size: 12px; }

.register-page { display: flex; align-items: center; justify-content: center; padding: 32px 20px; }
.register-page .auth-card { width: min(100%, 480px); min-height: auto; padding: 42px; border: 1px solid #ffffff80; border-radius: 20px; background: rgba(0, 0, 0, 0,1); box-shadow: 0 24px 70px #120b2866; backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
.register-page .auth-brand { color: #ede8f7; }
.register-page .auth-brand .brand-dot { color: #f1eff8; }
.register-page .auth-heading h1 { color: #f7f6fa; }
.register-page .auth-heading p { color: #f7f6fa; }
.register-page .auth-form > label:not(.remember-option) { color: #f4f2f7; }
.register-page .auth-form > select { height: 42px; margin-bottom: 7px; padding: 0 12px; border: 1px solid #e8e4ec; border-radius: 8px; color: #494352; background: #fff; font-size: 12px; }
.register-role-hint { margin-top: -5px; color: #d3cede; font-size: 12px; line-height: 1.5; }
.register-page .text-button { color: #f5f4f7; }
.register-page .auth-switch { color: #f5f4f7; }
.register-page .auth-side { display: none; }

@media (max-width: 1050px) {
  .sidebar { width: 215px; padding-right: 14px; padding-left: 14px; }
  .main-area { margin-left: 215px; padding-right: 25px; padding-left: 25px; }
  .stat-card { gap: 8px; padding-right: 10px; padding-left: 10px; }
  .stat-trend, .stat-note { font-size: 12px; }
  .auth-card { padding-right: 40px; padding-left: 40px; }
  .auth-page { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 760px) {
  .sidebar { position: static; width: 100%; height: auto; padding: 12px 16px 8px; border-right: 0; border-bottom: 1px solid #eeeaf1; }
  .brand { font-size: 20px; }
  .brand-mark { width: 27px; height: 27px; }
  .workspace-switcher, .menu-label, .sidebar-spacer, .upgrade-card, .help-link, .sidebar-profile { display: none; }
  .side-navigation { display: flex; gap: 5px; margin-top: 11px; overflow-x: auto; }
  .nav-link { width: auto; min-height: 35px; flex: 0 0 auto; padding: 0 11px; font-size: 12px; }
  .main-area { margin-left: 0; padding: 0 16px 28px; }
  .topbar { min-height: 75px; }
  .topbar h1 { font-size: 18px; }
  .topbar-actions { gap: 10px; }
  .profile-name, .profile-button .chevron { display: none; }
  .welcome-banner { min-height: 190px; padding: 22px; }
  .welcome-copy { max-width: 70%; }
  .welcome-copy h2 { font-size: 21px; }
  .welcome-copy p { max-width: 280px; font-size: 12px; line-height: 1.5; }
  .banner-art { position: absolute; right: -64px; bottom: -12px; opacity: .65; transform: scale(.75); transform-origin: bottom right; }
  .stats-grid { grid-template-columns: 1fr; gap: 9px; }
  .stat-card { min-height: 68px; padding: 11px 14px; }
  .stat-trend, .stat-note { margin-left: auto; font-size: 12px; }
  .bottom-grid { grid-template-columns: 1fr; }
  .page-content { margin-top: 17px; }
  .content-page-heading { align-items: flex-start; }
  .content-page-heading h2 { font-size: 22px; }
  .content-page-heading .button-primary { flex: 0 0 auto; padding: 0 9px; font-size: 12px; }
  .pipeline-summary { gap: 15px; overflow-x: auto; padding: 13px; }
  .pipeline-summary > div { flex: 0 0 auto; font-size: 12px; }
  .content-toolbar { align-items: flex-start; flex-direction: column; }
  .filters { width: 100%; }
  .search-box { width: 100%; }
  .filters select { flex: 0 0 125px; }
  .content-panel { padding: 15px; }
  .auth-page { grid-template-columns: 1fr; }
  .auth-card { width: 100%; max-width: 480px; min-height: 100vh; padding: 30px 26px; }
  .auth-brand { margin-bottom: 40px; }
  .auth-side { display: none; }
  .register-page { padding: 20px 16px; }
  .register-page .auth-card { width: 100%; min-height: auto; padding: 34px 26px; }
  .login-page { display: flex; min-height: 100vh; padding: 20px 16px; }
  .login-page .login-card { width: 100%; max-width: 440px; min-height: auto; padding: 34px 26px; }
  .login-page .auth-brand { margin-bottom: 34px; }
}
@media (max-width: 430px) {
  .welcome-copy { max-width: 90%; }
  .welcome-copy h2 { max-width: 245px; font-size: 19px; }
  .welcome-copy p { max-width: 230px; }
  .banner-art { right: -93px; opacity: .45; }
  .section-heading { align-items: flex-start; }
  .section-heading .button-outline { padding: 0 9px; }
  .content-page-heading { gap: 8px; }
  .content-page-heading > div > p:last-child { max-width: 210px; line-height: 1.5; }
  .form-row { grid-template-columns: 1fr; }
  .content-modal { padding: 20px; }
}

.app-shell {
  min-height: 100vh;
  background: #f8fafc;
  color: #1f2937;
}

.ui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  transition: color .15s, background-color .15s, border-color .15s, box-shadow .15s;
}
.ui-button:disabled { pointer-events: none; opacity: .5; }
.ui-button-default { color: #fff; background: #7657dc; }
.ui-button-default:hover { background: #6546ca; }
.ui-button-secondary { color: #4f3a9f; background: #fff; }
.ui-button-secondary:hover { background: #f4f0ff; }
.ui-button-outline { border-color: #e5e7eb; color: #374151; background: #fff; }
.ui-button-outline:hover { border-color: #d1d5db; background: #f9fafb; }
.ui-button-ghost { color: #525866; background: transparent; }
.ui-button-ghost:hover { background: #f3f4f6; }
.ui-button-default, .ui-button-secondary, .ui-button-outline { box-shadow: 0 1px 2px #1118270a; }
.ui-button-default, .ui-button-secondary, .ui-button-outline, .ui-button-ghost { min-height: 38px; padding: 0 14px; }
.ui-button-sm { min-height: 34px; padding: 0 12px; font-size: 14px; }
.ui-button-icon { width: 38px; min-height: 38px; padding: 0; }
.ui-card { min-width: 0; border: 1px solid #e5e7eb; border-radius: 12px; background: #fff; box-shadow: 0 1px 2px #11182708; }
.ui-card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 20px 22px 0; }
.ui-card-title { margin: 0; color: #111827; font-size: 18px; font-weight: 650; letter-spacing: -.25px; }
.ui-card-description { margin: 5px 0 0; color: #858b98; font-size: 14px; line-height: 1.5; }
.ui-card-content { padding: 18px 22px 22px; }
.ui-badge { display: inline-flex; align-items: center; justify-content: center; gap: 5px; border: 1px solid transparent; border-radius: 999px; padding: 4px 9px; font-size: 12px; font-weight: 600; line-height: 1.3; white-space: nowrap; }
.ui-badge-secondary { color: #504080; background: #f1edff; }
.ui-badge-outline { border-color: #e5e7eb; color: #626978; background: #fff; }
.ui-progress { width: 100%; height: 8px; overflow: hidden; border-radius: 999px; background: #eeedf3; }
.ui-progress span { display: block; height: 100%; border-radius: inherit; background: #795be0; transition: width .25s ease; }
.ui-separator { height: 1px; width: 100%; background: #e9ebf0; }

.app-shell .app-sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 5;
  display: flex;
  width: 256px;
  flex-direction: column;
  padding: 24px 16px 14px;
  border-right: 1px solid #e8eaf0;
  background: #fff;
}
.app-sidebar-brand { display: grid; justify-items: center; gap: 6px; padding: 0 8px; color: #fff; font-size: 12px; font-weight: 650; letter-spacing: .15px; cursor: default; pointer-events: none; }
.app-sidebar-brand-name { color: inherit; font-size: inherit; font-weight: inherit; letter-spacing: inherit; }
.app-sidebar-brand > span:last-child > span { color: #7657dc; }
.app-sidebar-brand-mark { display: grid; width: 32px; height: 32px; place-items: center; border-radius: 9px; color: #fff; background: #7657dc; font-family: Georgia, serif; font-size: 26px; font-style: italic; line-height: 1; }
.app-sidebar .app-workspace-switcher { justify-content: flex-start; height: 58px; margin-top: 30px; padding: 8px 10px; text-align: left; }
.app-workspace-icon { display: grid; width: 34px; height: 34px; flex: 0 0 auto; place-items: center; border-radius: 8px; color: #7557dc; background: #f1edff; }
.app-workspace-copy { display: grid; flex: 1; gap: 3px; }
.app-workspace-copy strong, .app-profile-copy strong { color: #343846; font-size: 14px; font-weight: 650; }
.app-workspace-copy small, .app-profile-copy small { color: #9298a5; font-size: 12px; font-weight: 400; }
.app-sidebar-section-label { margin: 29px 8px 9px; color: #969ba7; font-size: 12px; font-weight: 700; letter-spacing: .9px; }
.app-sidebar-nav { display: grid; gap: 4px; }
.app-sidebar .app-sidebar-link { min-height: 42px; justify-content: flex-start; padding: 0 11px; color: #686e7b; font-size: 14px; font-weight: 550; }
.app-sidebar .app-sidebar-link.active { color: #684dd0; background: #f2efff; font-weight: 650; }
.app-sidebar-link > span:nth-child(2) { flex: 1; text-align: left; }
.app-sidebar .app-sidebar-link.active:hover { background: #ece7ff; }
.app-sidebar-count { min-height: 22px; padding: 2px 7px; color: #725ad0; font-size: 12px; }
.app-sidebar-spacer { flex: 1; min-height: 25px; }
.app-sidebar-upgrade { position: relative; padding: 15px 13px 13px; border: 1px solid #ece8fb; border-radius: 11px; background: #faf9ff; }
.app-sidebar-upgrade-icon { display: grid; width: 32px; height: 32px; place-items: center; margin-bottom: 12px; border-radius: 9px; color: #7557dc; background: #f0edff; }
.app-sidebar-upgrade > strong { color: #393448; font-size: 14px; font-weight: 650; }
.app-sidebar-upgrade p { margin: 6px 0 12px; color: #858291; font-size: 12px; line-height: 1.55; }
.app-sidebar-upgrade .ui-button { min-height: 31px; padding: 0 9px; color: #6d53d1; font-size: 12px; }
.app-sidebar .app-sidebar-help { min-height: 39px; justify-content: flex-start; margin: 10px 0 6px; padding: 0 9px; color: #777d89; font-size: 12px; }
.app-sidebar-separator { margin: 0 0 8px; }
.app-sidebar .app-sidebar-profile { width: 100%; min-height: 48px; justify-content: flex-start; padding: 4px 5px; text-align: left; }
.app-avatar { display: grid; width: 34px; height: 34px; flex: 0 0 auto; place-items: center; border: 1px solid #e6dcff; border-radius: 50%; color: #6f51d2; background: #f2edff; font-size: 14px; font-weight: 700; }
.app-profile-copy { display: grid; flex: 1; gap: 3px; }
.app-sidebar-profile > svg { color: #979ba5; }

.app-shell .main-area { min-height: 100vh; margin-left: 256px; padding: 0 38px 38px; }
.app-topbar { position: sticky; top: 0; z-index: 4; display: flex; width: calc(100% + 76px); min-height: 78px; align-items: center; justify-content: space-between; margin-left: -38px; padding: 0 38px; }
.app-topbar::before { position: absolute; z-index: -1; inset: 0 -100vw; border-bottom: 1px solid #e8eaf0; background: #fff; content: ''; }
.app-topbar-heading .eyebrow { color: #9298a5; font-size: 12px; }
.app-topbar-heading h1 { margin: 0; color: #202431; font-size: 23px; font-weight: 650; letter-spacing: -.45px; }
.app-topbar-actions { display: flex; align-items: center; gap: 12px; }
.app-shell .app-notification-button { position: relative; width: 38px; }
.app-notification-button > span { position: absolute; top: 7px; right: 8px; width: 7px; height: 7px; border: 1px solid #fff; border-radius: 50%; background: #ec7180; }
.app-shell .app-topbar-profile { gap: 9px; padding: 0 8px; color: #454958; font-size: 14px; }
.app-topbar-profile-name { font-weight: 550; }

.dashboard-page { display: grid; max-width: 1320px; gap: 18px; margin: 25px auto 0; }
.dashboard-hero { position: relative; display: flex; min-height: 222px; overflow: hidden; align-items: center; justify-content: space-between; padding: 28px 36px; border: 0; background: linear-gradient(115deg, #6e50d2 0%, #866be1 55%, #a28beb 100%); box-shadow: 0 12px 26px #6546c41c; }
.dashboard-hero-copy { position: relative; z-index: 1; max-width: 500px; }
.dashboard-hero-badge { border-color: #ffffff45; color: #f8f5ff; background: #ffffff18; font-size: 12px; letter-spacing: .55px; }
.dashboard-hero-copy h2 { max-width: 460px; margin: 13px 0 8px; color: #fff; font-size: 27px; font-weight: 650; letter-spacing: -.7px; line-height: 1.3; }
.dashboard-hero-copy p { margin: 0 0 17px; color: #eee9ff; font-size: 14px; }
.dashboard-hero-copy .ui-button { min-height: 38px; box-shadow: 0 3px 9px #30215a20; }
.dashboard-hero-art { position: relative; width: 285px; height: 185px; flex: 0 0 285px; }
.dashboard-hero-orbit { position: absolute; top: 2px; right: 15px; width: 170px; height: 170px; border: 1px solid #ffffff30; border-radius: 50%; box-shadow: 0 0 0 21px #ffffff0c, 0 0 0 43px #ffffff08; }
.dashboard-idea-card { position: absolute; top: 29px; left: 89px; display: grid; width: 143px; gap: 14px; padding: 16px; border: 1px solid #ffffff85; border-radius: 13px; color: #38304b; background: #fff; box-shadow: 0 15px 28px #39276b40; transform: rotate(5deg); }
.dashboard-idea-card > span { display: flex; align-items: center; gap: 5px; color: #8976c3; font-size: 12px; font-weight: 700; letter-spacing: .5px; }
.dashboard-idea-card > strong { font-family: Georgia, serif; font-size: 18px; line-height: 1.35; }
.dashboard-idea-lines { display: grid; gap: 4px; }
.dashboard-idea-lines i { height: 3px; border-radius: 4px; background: #eeeaf8; }
.dashboard-idea-lines i:last-child { width: 65%; }
.dashboard-hero-star { position: absolute; top: 3px; right: 26px; color: #ffe8a6; font-size: 30px; }

.dashboard-stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 15px; }
.dashboard-stat-card { position: relative; display: flex; min-height: 112px; align-items: flex-start; gap: 13px; padding: 17px; }
.dashboard-stat-icon { display: grid; width: 40px; height: 40px; flex: 0 0 auto; place-items: center; border-radius: 10px; }
.dashboard-stat-icon.violet { color: #7455d6; background: #f1edff; }
.dashboard-stat-icon.amber { color: #c78d28; background: #fff6e4; }
.dashboard-stat-icon.emerald { color: #369c72; background: #e8f7ef; }
.dashboard-stat-copy { display: grid; gap: 4px; }
.dashboard-stat-copy > span { color: #707684; font-size: 12px; }
.dashboard-stat-copy > strong { color: #252a36; font-size: 24px; font-weight: 650; line-height: 1.1; }
.dashboard-stat-copy > small { color: #9a9eaa; font-size: 12px; }
.dashboard-stat-decoration { position: absolute; top: 17px; right: 16px; color: #a5a0b3; }

.dashboard-content-card { overflow: hidden; }
.dashboard-section-header { align-items: center; padding: 19px 21px 16px; }
.dashboard-section-header .ui-card-title { font-size: 17px; }
.dashboard-section-header .ui-card-description { font-size: 12px; }
.dashboard-section-header .ui-button { flex: 0 0 auto; }
.dashboard-table-content { padding: 0 21px 8px; }
.dashboard-table-scroll { overflow-x: auto; }
.dashboard-table { width: 100%; border-collapse: collapse; text-align: left; }
.dashboard-table th { padding: 11px 10px; border-bottom: 1px solid #eceef2; color: #969ba7; font-size: 12px; font-weight: 650; letter-spacing: .55px; white-space: nowrap; }
.dashboard-table th:first-child, .dashboard-table td:first-child { padding-left: 0; }
.dashboard-table td { padding: 11px 10px; border-bottom: 1px solid #f0f1f4; color: #666c79; font-size: 12px; white-space: nowrap; }
.dashboard-table tbody tr:last-child td { border-bottom: 0; }
.dashboard-table-title { display: flex; min-width: 260px; align-items: center; gap: 10px; }
.dashboard-table-title > span:last-child { display: grid; min-width: 0; gap: 4px; }
.dashboard-table-title strong { max-width: 330px; overflow: hidden; color: #343846; font-size: 12px; font-weight: 600; text-overflow: ellipsis; }
.dashboard-table-title small { color: #969ba7; font-size: 12px; }
.dashboard-platform-icon { display: grid; width: 34px; height: 34px; flex: 0 0 auto; place-items: center; border-radius: 9px; }
.dashboard-platform-icon.platform-youtube { color: #e5484d; background: #fff0f0; }
.dashboard-platform-icon.platform-instagram { color: #b84a8d; background: #fff0f7; }
.dashboard-platform-icon.platform-tiktok { color: #35313e; background: #f1f0f3; }
.dashboard-platform-icon.platform-linkedin { color: #2876b5; background: #edf6ff; }
.dashboard-platform-name { color: #f2f3f5; }
.dashboard-status { padding: 5px 9px; font-size: 12px; }
.dashboard-status i { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.dashboard-date { display: inline-flex; align-items: center; gap: 6px; color: #f2f4f8; }
.dashboard-table td:last-child { width: 42px; padding-right: 0; text-align: right; }
.dashboard-table td:last-child .ui-button { color: #858b98; }
.dashboard-empty-state { display: grid; justify-items: center; gap: 9px; padding: 35px 10px; text-align: center; }
.dashboard-empty-state > span { display: grid; width: 44px; height: 44px; place-items: center; border-radius: 12px; color: #7657dc; background: #f2efff; }
.dashboard-empty-state > strong { color: #343846; font-size: 15px; }
.dashboard-empty-state p { margin: 0 0 3px; color: #858b98; font-size: 12px; }

.dashboard-bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.dashboard-goal-card .ui-card-content { padding-top: 14px; }
.dashboard-goal-icon { display: grid; width: 36px; height: 36px; place-items: center; border-radius: 10px; color: #7758dd; background: #f2efff; }
.dashboard-goal-meta { display: flex; justify-content: space-between; margin-bottom: 10px; color: #555b68; font-size: 12px; }
.dashboard-goal-meta strong { font-weight: 600; }
.dashboard-goal-meta span { color: #7657dc; font-weight: 650; }
.dashboard-helper { display: flex; align-items: center; gap: 6px; margin: 10px 0 0; color: #858b98; font-size: 12px; }
.dashboard-helper svg { color: #48a47a; }
.dashboard-monthly-goal { margin-top: 17px; padding-top: 14px; border-top: 1px solid #ffffff18; }
.dashboard-monthly-goal-heading { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 12px; }
.dashboard-monthly-goal-heading > span { display: flex; align-items: center; gap: 6px; color: #e0e2ed; font-size: 12px; font-weight: 650; }
.dashboard-monthly-goal-heading > span svg { color: #9a8bff; }
.dashboard-monthly-goal-heading > strong { color: #aeb2c1; font-size: 12px; font-weight: 500; }
.dashboard-monthly-goal .dashboard-goal-meta { margin-bottom: 7px; color: #b9bdcb; font-size: 12px; }
.dashboard-monthly-goal .dashboard-goal-meta span { color: #9bb1ff; }
.dashboard-page .dashboard-monthly-goal-progress { height: 6px; background: #ffffff19; }
.dashboard-page .dashboard-monthly-goal-progress span { background: linear-gradient(90deg, #8272ef, #61cbb2); }
.dashboard-monthly-goal .dashboard-helper { margin-top: 8px; color: #aeb2c1; font-size: 12px; line-height: 1.5; }
.dashboard-monthly-goal .dashboard-helper svg { flex: 0 0 auto; color: #70d0a0; }
.dashboard-monthly-card { min-width: 0; }
.dashboard-monthly-icon { display: grid; width: 36px; height: 36px; flex: 0 0 auto; place-items: center; border-radius: 10px; color: #88a3ff; background: #657eff24; }
.dashboard-monthly-content { padding-top: 2px; }
.dashboard-monthly-summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; margin-bottom: 15px; }
.dashboard-monthly-summary > div { display: grid; gap: 4px; padding: 9px 10px; border: 1px solid #ffffff12; border-radius: 8px; background: #ffffff07; }
.dashboard-monthly-summary strong { color: #f1f2f8; font-size: 19px; font-weight: 650; line-height: 1; }
.dashboard-monthly-summary span { color: #aeb2c1; font-size: 12px; line-height: 1.35; }
.dashboard-monthly-progress-heading { display: flex; justify-content: space-between; margin-bottom: 7px; color: #b9bdcb; font-size: 12px; }
.dashboard-monthly-progress-heading strong { color: #9bb1ff; }
.dashboard-page .dashboard-monthly-progress { height: 6px; background: #ffffff19; }
.dashboard-page .dashboard-monthly-progress span { background: linear-gradient(90deg, #6d7fff, #68d4bb); }
.dashboard-stage-breakdown { display: grid; gap: 8px; margin-top: 14px; }
.dashboard-stage-row { display: grid; grid-template-columns: 7px minmax(76px, 1fr) minmax(40px, 1.2fr) 16px; align-items: center; gap: 7px; }
.dashboard-stage-dot { width: 6px; height: 6px; border-radius: 50%; }
.dashboard-stage-dot.status-idea { background: #a38be9; }
.dashboard-stage-dot.status-writing { background: #e5b556; }
.dashboard-stage-dot.status-production { background: #66bfd1; }
.dashboard-stage-dot.status-editing { background: #ec9977; }
.dashboard-stage-dot.status-ready { background: #6fc99a; }
.dashboard-stage-dot.status-published { background: #7f9bee; }
.dashboard-stage-label { overflow: hidden; color: #c2c5d1; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.dashboard-stage-track { height: 4px; overflow: hidden; border-radius: 99px; background: #ffffff12; }
.dashboard-stage-track i { display: block; height: 100%; border-radius: inherit; background: linear-gradient(90deg, #7668ec, #7faff5); }
.dashboard-stage-row strong { color: #e4e5ed; font-size: 12px; text-align: right; }
.dashboard-monthly-empty { margin: 10px 0 0; color: #9fa3b2; font-size: 12px; }

@media (max-width: 1050px) {
  .app-shell .main-area { padding-right: 24px; padding-left: 24px; }
  .dashboard-stat-card { gap: 9px; padding: 14px; }
  .dashboard-stat-copy > span { font-size: 12px; }
}
@media (max-width: 760px) {
  .app-shell .app-sidebar { position: static; width: 100%; height: auto; padding: 12px 16px 9px; border-right: 0; border-bottom: 1px solid #e8eaf0; }
  .app-sidebar-brand { font-size: 19px; }
  .app-sidebar-brand-mark { width: 29px; height: 29px; font-size: 24px; }
  .app-sidebar .app-workspace-switcher, .app-sidebar-section-label, .app-sidebar-spacer, .app-sidebar-upgrade, .app-sidebar-help, .app-sidebar-separator, .app-sidebar-profile { display: none; }
  .app-sidebar-nav { display: flex; gap: 5px; margin-top: 10px; overflow-x: auto; }
  .app-sidebar .app-sidebar-link { width: auto; min-height: 35px; flex: 0 0 auto; padding: 0 11px; font-size: 12px; }
  .app-shell .main-area { margin-left: 0; padding: 0 16px 26px; }
  .app-topbar { width: calc(100% + 32px); min-height: 64px; margin-left: -16px; padding: 0 16px; }
  .app-topbar-heading .eyebrow { font-size: 12px; }
  .app-topbar-actions { gap: 6px; }
  .app-shell .app-topbar-profile { padding: 0 2px; }
  .app-topbar-profile-name, .app-topbar-profile > svg { display: none; }
  .dashboard-page { gap: 12px; margin-top: 16px; }
  .dashboard-hero { min-height: 190px; padding: 20px; }
  .dashboard-hero-copy { max-width: 75%; }
  .dashboard-hero-copy h2 { font-size: 21px; }
  .dashboard-hero-copy p { max-width: 280px; font-size: 12px; line-height: 1.5; }
  .dashboard-hero-art { position: absolute; right: -92px; bottom: -12px; opacity: .7; transform: scale(.8); transform-origin: bottom right; }
  .dashboard-stats { grid-template-columns: 1fr; gap: 9px; }
  .dashboard-stat-card { min-height: 76px; align-items: center; padding: 11px 14px; }
  .dashboard-stat-copy { grid-template-columns: auto auto; align-items: baseline; column-gap: 9px; }
  .dashboard-stat-copy > strong { grid-row: 2; }
  .dashboard-stat-copy > small { grid-column: 2; grid-row: 2; }
  .dashboard-stat-decoration { top: 13px; right: 14px; }
  .dashboard-section-header { padding: 15px 15px 12px; }
  .dashboard-table-content { padding: 0 15px 6px; }
  .dashboard-bottom-grid { grid-template-columns: 1fr; gap: 11px; }
  .dashboard-monthly-summary { gap: 5px; }
  .dashboard-monthly-summary > div { padding: 8px 7px; }
}
@media (max-width: 430px) {
  .dashboard-hero-copy { max-width: 90%; }
  .dashboard-hero-copy h2 { max-width: 245px; font-size: 19px; }
  .dashboard-hero-copy p { max-width: 230px; }
  .dashboard-hero-art { right: -122px; opacity: .48; }
  .dashboard-section-header { align-items: flex-start; gap: 8px; }
  .dashboard-section-header .ui-button { min-height: 31px; gap: 5px; padding: 0 8px; font-size: 12px; }
}

.app-shell {
  min-height: 100vh;
  background:
    radial-gradient(ellipse at 78% 6%, #263a6860, transparent 36%),
    linear-gradient(135deg, #171827, #10151b 55%, #18232a);
  color: #f3f3f8;
}
.app-shell .app-sidebar {
  width: 82px;
  align-items: center;
  padding: 22px 10px 16px;
  border-color: #ffffff12;
  background: linear-gradient(180deg, #171827, #121720);
}
.app-sidebar-brand { justify-content: center; padding: 0; }
.app-sidebar-brand-mark { width: 36px; height: 36px; border-radius: 12px; background: linear-gradient(145deg, #7762ff, #4d68e9); box-shadow: 0 5px 18px #675bff55; }
.app-sidebar-nav { width: 100%; gap: 8px; margin-top: 44px; }
.app-shell .app-sidebar .app-sidebar-link {
  width: 100%;
  min-height: 58px;
  flex-direction: column;
  gap: 6px;
  padding: 8px 3px;
  border-radius: 12px;
  color: #9699ad;
  font-size: 12px;
}
.app-shell .app-sidebar .app-sidebar-link.active { color: #fff; background: linear-gradient(135deg, #6f56e8, #477ae5); box-shadow: 0 6px 18px #5146bd54; }
.app-shell .app-sidebar .app-sidebar-link.active:hover { background: linear-gradient(135deg, #6f56e8, #477ae5); }
.app-sidebar-link > span:nth-child(2) { flex: initial; text-align: center; }
.app-sidebar-spacer { min-height: 20px; }
.app-shell .app-sidebar-help, .app-shell .app-sidebar-profile { width: 100%; min-height: 48px; justify-content: center; margin: 4px 0; padding: 5px; color: #a2a4b3; }
.app-shell .app-sidebar-logout { width: 100%; min-height: 48px; justify-content: center; margin: 4px 0; padding: 5px; color: #a2a4b3; }
.app-shell .app-sidebar-logout:hover { color: #ff9a9a; background: #ffffff12; }
.app-sidebar-help span { display: none; }
.app-sidebar .app-avatar { width: 36px; height: 36px; border-color: #ffffff35; color: #fff; background: linear-gradient(145deg, #e19b76, #985e91); }
.app-shell .main-area { min-height: 100vh; margin-left: 82px; padding: 0 24px 38px; }
.app-topbar {
  position: sticky;
  top: 0;
  z-index: 4;
  display: flex;
  width: calc(100% + 48px);
  min-height: 104px;
  align-items: center;
  justify-content: space-between;
  margin-left: -24px;
  padding: 20px 26px 18px;
  background: linear-gradient(110deg, #373cca 0%, #3059dd 48%, #4669f0 100%);
  box-shadow: 0 12px 30px #0a102c3b;
}
.app-topbar::before { display: none; }
.app-topbar-heading { display: grid; gap: 5px; }
.project-breadcrumb { color: #d4d9ffb8; font-size: 12px; }
.project-breadcrumb span { padding: 0 5px; color: #ffffff83; }
.project-title-row { display: flex; align-items: center; gap: 12px; }
.app-topbar-heading h1 { color: #fff; font-size: 23px; font-weight: 700; letter-spacing: -.35px; }
.project-change-button.ui-button { min-height: 24px; padding: 0 9px; border: 1px solid #ffffff30; border-radius: 6px; color: #f1f2ff; font-size: 12px; font-weight: 500; }
.project-change-button.ui-button:hover { background: #ffffff16; }
.app-topbar-actions { align-self: flex-start; gap: 13px; margin-top: 12px; }
.app-shell .app-notification-button { position: relative; display: inline-flex; width: 36px; height: 36px; min-height: 36px; align-items: center; justify-content: center; padding: 0; border: 1px solid #ffffff35; border-radius: 9px; color: #fff; background: #ffffff12; box-shadow: none; }
.app-notification-button > span { border-color: #4c68e9; }
.notification-dropdown { position: relative; }
.notification-dropdown > summary { list-style: none; cursor: pointer; }
.notification-dropdown > summary::-webkit-details-marker { display: none; }
.notification-dropdown[open] > summary { background: #ffffff24; }
.notification-dropdown > summary > span { position: absolute; top: 5px; right: 5px; width: 7px; height: 7px; border: 1px solid #4c68e9; border-radius: 50%; background: #ff7887; }
.notification-panel {
  position: absolute;
  z-index: 8;
  top: calc(100% + 12px);
  right: 0;
  width: min(350px, calc(100vw - 24px));
  overflow: hidden;
  border: 1px solid #ffffff20;
  border-radius: 12px;
  color: #e9eaf2;
  background: #1d202d;
  box-shadow: 0 16px 38px #06081178;
}
.notification-panel-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 15px; border-bottom: 1px solid #ffffff16; }
.notification-panel-heading > div { display: grid; gap: 4px; }
.notification-panel-heading strong { color: #f1f2f7; font-size: 14px; font-weight: 650; }
.notification-panel-heading span { color: #a7aab8; font-size: 12px; }
.notification-panel-heading button { padding: 5px 7px; border: 0; border-radius: 6px; color: #bdb3ff; background: transparent; font-size: 12px; }
.notification-panel-heading button:hover { background: #ffffff10; }
.notification-list { display: grid; max-height: 340px; overflow-y: auto; margin: 0; padding: 5px; list-style: none; }
.notification-item { display: flex; width: 100%; align-items: center; gap: 10px; padding: 10px 8px; border: 0; border-radius: 8px; color: inherit; background: transparent; text-align: left; cursor: pointer; }
.notification-item:hover, .notification-item:focus-visible { background: #ffffff0d; }
.notification-icon { display: grid; width: 32px; height: 32px; flex: 0 0 auto; place-items: center; border-radius: 9px; color: #e7b85f; background: #e7b85f1c; }
.notification-icon.ready { color: #73d6a4; background: #73d6a41c; }
.notification-copy { display: grid; min-width: 0; flex: 1; gap: 4px; }
.notification-copy > strong { color: #e9eaf2; font-size: 12px; font-weight: 650; }
.notification-copy > span { overflow: hidden; color: #c6c8d3; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.notification-copy > small { display: flex; align-items: center; gap: 5px; color: #9296a8; font-size: 12px; }
.notification-copy > small i { width: 3px; height: 3px; border-radius: 50%; background: #74798b; }
.notification-arrow { flex: 0 0 auto; color: #868b9f; }
.notification-empty { display: grid; justify-items: center; gap: 7px; padding: 25px 14px; color: #989daf; text-align: center; }
.notification-empty > svg { color: #858ba1; }
.notification-empty > strong { color: #e3e5ed; font-size: 12px; }
.notification-empty > span { font-size: 12px; }
.app-shell .app-topbar-profile { color: #fff; font-size: 12px; }
.app-shell .app-topbar-profile:hover { background: #ffffff13; }
.app-topbar-profile .app-avatar { width: 29px; height: 29px; border-color: #ffffff42; }
.app-topbar-profile > svg { color: #e2e5ff; }
.app-topbar-profile-identity { display: grid; gap: 3px; text-align: left; }
.app-topbar-profile-name { font-weight: 600; }
.app-topbar-profile-role { color: #d5dcff; font-size: 12px; }
.profile-dropdown { position: relative; }
.profile-dropdown > summary { display: flex; list-style: none; cursor: pointer; }
.profile-dropdown > summary::-webkit-details-marker { display: none; }
.profile-dropdown[open] > summary > svg { transform: rotate(180deg); }
.profile-card {
  position: absolute;
  z-index: 8;
  top: calc(100% + 12px);
  right: 0;
  width: 272px;
  padding: 15px;
  border: 1px solid #ffffff20;
  border-radius: 12px;
  color: #e9eaf2;
  background: #1d202d;
  box-shadow: 0 16px 38px #06081178;
}
.profile-card-heading { display: flex; align-items: center; gap: 10px; padding: 2px 1px 13px; border-bottom: 1px solid #ffffff16; }
.profile-card-avatar { display: grid; width: 38px; height: 38px; flex: 0 0 auto; place-items: center; border: 1px solid #ffffff30; border-radius: 50%; color: #fff; background: linear-gradient(145deg, #e19b76, #985e91); font-size: 16px; font-weight: 700; }
.profile-card-heading > span:last-child, .profile-account-name { display: grid; gap: 3px; }
.profile-card-heading strong, .profile-account-name strong { color: #f1f2f7; font-size: 12px; font-weight: 650; }
.profile-card-heading small, .profile-account-name small { color: #a7aab8; font-size: 12px; }
.profile-accounts-heading { display: flex; align-items: center; justify-content: space-between; padding: 13px 1px 8px; }
.profile-accounts-heading strong { color: #d9dbe6; font-size: 12px; font-weight: 650; }
.profile-accounts-heading > span { color: #a7aab8; font-size: 12px; }
.profile-account-list { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
.profile-account-list li { display: flex; min-height: 42px; align-items: center; gap: 9px; padding: 5px 6px; border-radius: 8px; }
.profile-account-list li:hover { background: #ffffff0b; }
.profile-platform-icon { display: grid; width: 30px; height: 30px; flex: 0 0 auto; place-items: center; border-radius: 8px; background: #ffffff12; }
.profile-platform-icon.youtube { color: #ff777c; }
.profile-platform-icon.instagram { color: #f398c8; }
.profile-platform-icon.tiktok { color: #d8d8e0; }
.profile-platform-icon.linkedin { color: #83bafa; }
.profile-account-name { flex: 1; }
.profile-account-indicator { width: 6px; height: 6px; border-radius: 50%; background: #71d6a2; box-shadow: 0 0 8px #71d6a277; }
.app-navbar .profile-card { max-height: calc(100vh - 96px); overflow-y: auto; }
.profile-role-validation { display: grid; gap: 5px; margin: 12px 0 2px; padding: 10px 11px; border: 1px solid #ffffff12; border-radius: 9px; background: #ffffff08; }
.profile-role-validation strong { color: #e6e2ff; font-size: 12px; font-weight: 700; }
.profile-role-validation > span { color: #b6b9c9; font-size: 12px; line-height: 1.55; }
.profile-role-validation.role-creator { border-color: #9e86ff32; background: #8a71ff12; }
.profile-role-validation.role-editor { border-color: #67cbb832; background: #44bd9b0d; }
.profile-role-validation.role-admin { border-color: #e3b65a32; background: #e3b65a0d; }
.profile-account-email { margin-top: 10px; padding: 8px 9px; border: 1px solid #ffffff12; border-radius: 7px; color: #b7bbcc; background: #ffffff07; font-size: 12px; }
.role-board-note { color: #f4f5f7; font-size: 12px; }
.kanban-creator-approval { display: inline-flex; margin-top: 8px; padding: 4px 7px; border: 1px solid #e6b65732; border-radius: 999px; color: #f0c979; background: #e6b6570c; font-size: 12px; line-height: 1.2; }
.kanban-creator-approval.approved { border-color: #69d6a033; color: #85ddb0; background: #69d6a00d; }
.workflow-permission-note { margin: 0; padding: 8px 10px; border: 1px solid #e6b65732; border-radius: 7px; color: #f0c979; background: #e6b6570c; font-size: 12px; line-height: 1.5; }
.content-page .content-form :is(input, textarea, select):disabled { opacity: .68; cursor: not-allowed; }
.content-page .production-checklist input:disabled, .content-page .workflow-approval input:disabled { cursor: not-allowed; }
.login-error { margin: 3px 0 0; color: #ffd1d6; font-size: 12px; line-height: 1.5; }
.login-page .demo-account-hint { display: grid; gap: 5px; margin-top: 16px; padding: 11px 13px; border: 1px solid #ffffff38; border-radius: 9px; color: #f0edf8; background: #17112475; font-size: 12px; }
.login-page .demo-account-hint strong { color: #fff; font-size: 12px; }
.content-page { max-width: none; margin: 23px 0 0; }
.board-toolbar { display: flex; min-height: 42px; align-items: center; gap: 10px; margin-bottom: 18px; }
.board-task-count { display: flex; align-items: center; gap: 9px; color: #e4e5ed; font-size: 12px; }
.board-task-count strong { font-size: 12px; font-weight: 600; }
.board-online-dot { width: 6px; height: 6px; border-radius: 50%; background: #68d6a1; box-shadow: 0 0 9px #68d6a188; }
.board-add-button, .board-tool-button, .board-select-control, .board-search {
  display: inline-flex;
  height: 33px;
  align-items: center;
  gap: 7px;
  padding: 0 10px;
  border: 1px solid #ffffff1c;
  border-radius: 8px;
  color: #e1e2ed;
  background: #ffffff09;
  font-size: 12px;
}
.board-add-button { border-color: #7793ff; color: #fff; background: #4777f5; font-weight: 600; }
.board-add-button:hover { background: #5785ff; }
.board-toolbar-spacer { flex: 1; }
.board-search { width: 170px; color: #a3a8bb; }
.board-search input { width: 100%; min-width: 0; border: 0; outline: 0; color: #f3f4fa; background: transparent; font-size: 12px; }
.board-search input::placeholder { color: #9ca1b3; }
.board-select-control { position: relative; }
.board-select-control select { width: 54px; border: 0; appearance: none; color: #e1e2ed; background: transparent; font-size: 12px; outline: 0; }
.board-select-control option { color: #242631; }
.board-select-control > svg:last-child { pointer-events: none; }
.board-tool-button { cursor: pointer; }
.board-tool-button:hover { background: #ffffff16; }
.kanban-board { display: grid; grid-template-columns: repeat(6, minmax(180px, 1fr)); align-items: start; gap: 12px; min-height: 420px; overflow-x: auto; padding-bottom: 8px; }
.kanban-column { min-width: 0; }
.kanban-column-header { display: flex; min-height: 24px; align-items: center; justify-content: space-between; margin-bottom: 10px; color: #a8abba; }
.kanban-column-header > div { display: flex; align-items: center; gap: 7px; }
.kanban-column-header h2 { margin: 0; color: #d6d7e1; font-size: 12px; font-weight: 700; letter-spacing: .45px; }
.kanban-column-header > div > span { color: #8f93a4; font-size: 12px; }
.kanban-column-header button, .kanban-card-topline button { display: grid; width: 24px; height: 24px; place-items: center; border: 0; border-radius: 6px; color: #9ea2b2; background: transparent; }
.kanban-column-header button:hover, .kanban-card-topline button:hover { color: #fff; background: #ffffff12; }
.kanban-card-list { display: grid; align-content: start; gap: 8px; }
.kanban-card { min-width: 0; padding: 11px 11px 9px; border: 1px solid #ffffff16; border-radius: 10px; color: #292936; box-shadow: 0 5px 15px #06081128; }
.kanban-card-tone-0 { background: linear-gradient(145deg, #c7f2e7, #a9e3d7); }
.kanban-card-tone-1 { background: linear-gradient(145deg, #f9dba2, #f2c77e); }
.kanban-card-tone-2 { background: linear-gradient(145deg, #d8c7fa, #bea7ec); }
.kanban-card-tone-3 { background: linear-gradient(145deg, #dce2ea, #c3ccd7); }
.kanban-card-topline { display: flex; align-items: center; justify-content: space-between; gap: 5px; color: #53606b; }
.kanban-card-topline > span { display: inline-flex; min-width: 0; align-items: center; gap: 5px; overflow: hidden; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.kanban-card-topline button { width: 20px; height: 20px; flex: 0 0 auto; color: #66707b; }
.kanban-card h3 { margin: 7px 0 4px; color: #252b33; font-size: 12px; font-weight: 700; line-height: 1.45; }
.kanban-card-description { margin: 0; color: #58616a; font-size: 12px; }
.kanban-card-footer { display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-top: 10px; }
.kanban-priority { font-size: 12px; }
.priority-tinggi { color: #b35454; }
.priority-sedang { color: #9c7129; }
.priority-rendah { color: #3f8064; }
.kanban-assignees { display: flex; }
.kanban-assignees span { display: grid; width: 21px; height: 21px; margin-left: -4px; place-items: center; border: 2px solid #ffffffb0; border-radius: 50%; color: white; background: #5178a4; font-size: 12px; font-weight: 700; }
.kanban-assignees span:nth-child(2) { background: #a36d71; }
.kanban-status-control { display: flex; width: fit-content; align-items: center; gap: 5px; margin-top: 8px; color: #5f6870; }
.kanban-status-control select { width: 92px; border: 0; appearance: none; color: inherit; background: transparent; font-size: 12px; outline: 0; }
.kanban-status-control option { color: #262a31; }
.kanban-status-dot { width: 6px; height: 6px; flex: 0 0 auto; border-radius: 50%; background: #777; }
.kanban-status-dot.status-idea { background: #7761ce; }
.kanban-status-dot.status-writing { background: #c28a2c; }
.kanban-status-dot.status-production { background: #3a91a7; }
.kanban-status-dot.status-editing { background: #c3724e; }
.kanban-status-dot.status-ready { background: #42956c; }
.kanban-status-dot.status-published { background: #536fc1; }
.kanban-empty-column { display: grid; min-height: 72px; place-items: center; border: 1px dashed #ffffff20; border-radius: 9px; color: #FAF6F5; font-size: 12px; }
.dashboard-page .ui-card { border-color: #ffffff17; color: #e5e6ef; background: #ffffff0d; box-shadow: 0 5px 18px #07091324; }
.dashboard-page .dashboard-hero { border: 0; background: linear-gradient(115deg, #373cca, #3059dd 55%, #4669f0); }
.dashboard-page .dashboard-stat-copy > span, .dashboard-page .ui-card-description, .dashboard-page .dashboard-table td { color: #b9bdcb; }
.dashboard-page .dashboard-stat-copy > strong, .dashboard-page .ui-card-title, .dashboard-page .dashboard-table-title strong { color: #f3f4fa; }
.dashboard-page .dashboard-table th { border-color: #ffffff20; color: #a6aabc; }
.dashboard-page .dashboard-table td, .dashboard-page .dashboard-table tbody tr:last-child td { border-color: #ffffff12; }
.dashboard-page .dashboard-empty-state p { color: #b8b2a9; }

@media (max-width: 1050px) {
  .kanban-board { grid-template-columns: repeat(6, minmax(165px, 1fr)); overflow-x: auto; }
  .app-topbar-actions { gap: 7px; }
}
@media (min-width: 641px) and (max-width: 850px) {
  .app-topbar-actions { position: absolute; top: 12px; right: 16px; }
  .app-topbar-profile-name, .app-topbar-profile > svg { display: none; }
  .board-toolbar { flex-wrap: wrap; }
  .board-toolbar-spacer { display: none; }
}
@media (max-width: 640px) {
  .app-shell .app-sidebar { position: static; width: 100%; height: auto; flex-direction: row; justify-content: flex-start; gap: 14px; padding: 10px 14px; border-right: 0; border-bottom: 1px solid #ffffff16; }
  .app-sidebar-brand-mark { width: 32px; height: 32px; }
  .app-sidebar-nav { display: flex; width: auto; gap: 6px; margin: 0; overflow-x: auto; }
  .app-shell .app-sidebar .app-sidebar-link { width: auto; min-width: 76px; min-height: 36px; flex-direction: row; gap: 7px; padding: 0 9px; font-size: 12px; }
  .app-sidebar-link > span:nth-child(2) { flex: 0 0 auto; }
  .app-sidebar-spacer, .app-sidebar-help { display: none; }
  .app-shell .app-sidebar-logout { width: 40px; min-height: 40px; margin: 0 0 0 auto; }
  .app-shell .main-area { margin-left: 0; padding: 0 14px 26px; }
  .app-topbar { position: sticky; width: calc(100% + 28px); min-height: 102px; margin-left: -14px; padding: 16px 14px; }
  .app-topbar-heading { max-width: calc(100% - 175px); }
  .app-topbar-heading h1 { font-size: 20px; }
  .app-topbar-actions { position: absolute; top: 7px; right: 10px; gap: 5px; margin: 0; }
  .app-topbar-profile-name, .app-topbar-profile > svg { display: none; }
  .app-shell .app-topbar-profile { padding: 0 2px; }
  .content-page { margin-top: 17px; }
  .board-toolbar { flex-wrap: wrap; gap: 7px; }
  .board-toolbar-spacer { flex: 1 0 10px; }
  .board-search { flex: 1 1 130px; }
  .kanban-board { grid-template-columns: repeat(6, minmax(210px, 1fr)); gap: 13px; }
}
@media (max-width: 500px) {
  .app-shell .app-sidebar { gap: 9px; padding-right: 9px; padding-left: 9px; }
  .app-shell .app-sidebar .app-sidebar-link { min-width: 68px; }
  .app-topbar { min-height: 110px; }
  .app-topbar-heading { max-width: 100%; padding-top: 28px; }
  .app-topbar-actions { top: 8px; }
  .kanban-board { grid-template-columns: repeat(6, minmax(215px, 1fr)); overflow-x: auto; }
  .board-toolbar-spacer { display: none; }
  .board-search { order: 5; flex-basis: calc(100% - 120px); }
  .board-select-control { order: 6; }
  .board-tool-button { order: 7; }
}

.content-page .modal-backdrop {
  z-index: 20;
  padding: 24px;
  background: #080b14c9;
  backdrop-filter: blur(5px);
}
.content-page .content-modal {
  position: relative;
  z-index: 1;
  width: min(100%, 520px);
  max-height: min(90vh, 760px);
  overflow-y: auto;
  padding: 25px;
  border: 1px solid #ffffff20;
  border-radius: 15px;
  color: #e9eaf2;
  background: #1d202d;
  box-shadow: 0 20px 60px #050710a6;
}
.content-page .modal-kicker { color: #9d8cff; }
.content-page .modal-heading h2 { color: #f2f3f8; font-size: 21px; }
.content-page .modal-heading p { color: #a7aab8; font-size: 12px; line-height: 1.5; }
.content-page .modal-close { flex: 0 0 auto; color: #d3d5df; background: #ffffff12; cursor: pointer; }
.content-page .modal-close:hover { color: #fff; background: #ffffff20; }
.content-page .content-form { gap: 11px; margin-top: 22px; }
.content-page .content-form > label, .content-page .content-form .form-row label { margin-bottom: -3px; color: #d7d9e3; font-size: 12px; }
.content-page .content-form label span { color: #969bab; }
.content-page .content-form > input,
.content-page .content-form select,
.content-page .content-form input,
.content-page .content-form textarea {
  min-width: 0;
  min-height: 40px;
  padding: 0 11px;
  border: 1px solid #ffffff20;
  border-radius: 8px;
  color: #f0f1f6;
  background: #ffffff0b;
  font-size: 12px;
}
.content-page .content-form textarea { min-height: 76px; padding: 10px 11px; resize: vertical; line-height: 1.5; }
.content-page .content-form textarea::placeholder { color: #8f94a5; }
.content-page .content-form > input::placeholder { color: #8f94a5; }
.content-page .content-form select { cursor: pointer; }
.content-page .content-form select option { color: #252834; background: #fff; }
.content-page .content-form input[type="date"] { color-scheme: dark; }
.content-page .content-form input:focus,
.content-page .content-form select:focus,
.content-page .content-form textarea:focus {
  border-color: #718bff;
  outline: 3px solid #718bff35;
}
.content-page .form-row { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 13px; margin-top: 4px; }
.content-page .form-row > div { min-width: 0; gap: 8px; }
.content-page .modal-actions { gap: 9px; margin-top: 11px; }
.content-page .modal-actions button { min-height: 38px; padding: 0 15px; border-radius: 8px; font-size: 12px; cursor: pointer; }
.content-page .modal-actions .button-outline { border: 1px solid #ffffff24; color: #d3d5df; background: #ffffff0a; }
.content-page .modal-actions .button-outline:hover { background: #ffffff16; }
.content-page .modal-actions .button-primary { border-color: #617cf2; color: #fff; background: #4777f5; }
.content-page .modal-actions .button-primary:hover { background: #5785ff; box-shadow: 0 5px 15px #4777f538; }
.workflow-modal { display: flex; flex-direction: column; }
.workflow-stepper { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 3px; margin: 20px 0 4px; }
.workflow-step { position: relative; display: grid; justify-items: center; gap: 6px; color: #84899a; text-align: center; }
.workflow-step:not(:last-child)::after { position: absolute; top: 11px; left: calc(50% + 15px); width: calc(100% - 27px); height: 1px; background: #ffffff1d; content: ''; }
.workflow-step > span { z-index: 1; display: grid; width: 23px; height: 23px; place-items: center; border: 1px solid #ffffff2d; border-radius: 50%; color: #a9adbd; background: #252938; font-size: 12px; }
.workflow-step.active { color: #d9d5ff; }
.workflow-step.active > span { border-color: #8979ff; color: #fff; background: #6554d9; }
.workflow-step small { max-width: 60px; font-size: 12px; line-height: 1.25; }
.workflow-section-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin: 5px 0 2px; }
.workflow-section-heading strong { color: #dedfeb; font-size: 12px; font-weight: 650; }
.workflow-section-heading > span { color: #9499aa; font-size: 12px; text-align: right; }
.workflow-stage-section { display: grid; gap: 10px; margin-top: 8px; padding: 13px; border: 1px solid #ffffff17; border-radius: 9px; background: #ffffff06; }
.workflow-stage-section .workflow-section-heading { margin: 0 0 2px; }
.workflow-helper-field { display: grid; align-content: center; gap: 6px; }
.workflow-helper-field > span { color: #d7d9e3; font-size: 12px; font-weight: 650; }
.workflow-helper-field small { color: #a7aab8; font-size: 12px; }
.content-page .content-form input[type="file"] { height: auto; min-height: 39px; padding: 6px; color: #b8bbc8; font-size: 12px; }
.content-page .content-form input[type="file"]::file-selector-button { min-height: 25px; margin-right: 9px; padding: 0 9px; border: 1px solid #ffffff24; border-radius: 6px; color: #e5e5f0; background: #ffffff12; font-size: 12px; cursor: pointer; }
.workflow-file-name { display: flex; align-items: center; gap: 6px; margin: -5px 0 0; color: #a9dfc2; font-size: 12px; overflow-wrap: anywhere; }
.production-checklist { display: grid; gap: 7px; }
.production-checklist label, .workflow-approval { display: flex; align-items: center; gap: 8px; color: #c8cad5; font-size: 12px; line-height: 1.4; cursor: pointer; }
.content-page .production-checklist input[type="checkbox"], .content-page .workflow-approval input { width: 14px; min-height: 14px; height: 14px; flex: 0 0 auto; accent-color: #7161ef; }
.content-page .production-checklist input[type="text"], .production-checklist-add input { width: 100%; min-width: 0; min-height: 34px; height: 34px; flex: 1 1 auto; padding: 0 9px; border: 1px solid #ffffff24; border-radius: 6px; color: #e6e8f0; background: #ffffff0a; font-size: 12px; }
.production-checklist-add { display: flex; align-items: center; gap: 7px; }
.production-checklist-add button { min-height: 34px; padding: 0 9px; border: 1px solid #ffffff24; border-radius: 6px; color: #d3d5df; background: #ffffff0a; font-size: 12px; }
.metrics-history { display: grid; gap: 8px; margin-top: 18px; padding: 12px; border: 1px solid #ffffff17; border-radius: 9px; background: #ffffff06; }
.metrics-history .workflow-section-heading { margin: 0; }
.metrics-history-scroll { max-height: 150px; overflow: auto; }
.metrics-history table { width: 100%; border-collapse: collapse; text-align: right; white-space: nowrap; }
.metrics-history th, .metrics-history td { padding: 7px 6px; border-bottom: 1px solid #ffffff12; color: #c8cad5; font-size: 12px; }
.metrics-history th { color: #9499aa; font-weight: 600; }
.metrics-history th:first-child, .metrics-history td:first-child { text-align: left; }
.metrics-history-empty { margin: 0; color: #a7aab8; font-size: 12px; }
.workflow-form-error { margin: 0; padding: 9px 10px; border: 1px solid #fa8d8d4a; border-radius: 7px; color: #ffb1b1; background: #fa8d8d12; font-size: 12px; line-height: 1.5; }
.kanban-status-chip { padding: 3px 7px; border-radius: 999px; font-size: 12px; line-height: 1.2; white-space: nowrap; }
.kanban-published-link { display: inline-flex; align-items: center; gap: 5px; margin-top: 9px; color: #344f86; font-size: 12px; font-weight: 650; text-decoration: none; }
.kanban-published-link:hover { text-decoration: underline; }
.kanban-draft-attachment { display: flex; align-items: center; gap: 5px; margin: 7px 0 0; color: #4c5665; font-size: 12px; overflow-wrap: anywhere; }
.kanban-metrics { display: flex; flex-wrap: wrap; gap: 5px 8px; margin-top: 7px; color: #505b68; font-size: 12px; }
.kanban-metrics strong { color: #29323e; }
.kanban-edit-button { display: inline-flex; align-items: center; gap: 5px; margin-top: 9px; padding: 4px 6px; border: 1px solid #3541511c; border-radius: 5px; color: #4c5665; background: #ffffff3b; font-size: 12px; cursor: pointer; }
.kanban-edit-button:hover { background: #ffffff80; }

@media (max-width: 500px) {
  .content-page .modal-backdrop { align-items: start; padding: 12px; }
  .content-page .content-modal { width: 100%; max-height: calc(100dvh - 24px); padding: 19px; border-radius: 13px; }
  .content-page .form-row { grid-template-columns: minmax(0, 1fr); gap: 11px; }
  .content-page .modal-actions { position: sticky; bottom: -19px; margin: 5px -19px -19px; padding: 12px 19px 19px; border-top: 1px solid #ffffff16; background: #1d202d; }
  .workflow-stepper { gap: 0; }
  .workflow-step small { max-width: 52px; font-size: 12px; }
  .workflow-section-heading { align-items: flex-start; flex-direction: column; gap: 3px; }
  .workflow-section-heading > span { text-align: left; }
}

.app-shell .main-area {
  min-height: calc(100vh - 76px);
  margin-left: 0;
  padding: 0 clamp(16px, 4vw, 48px) 40px;
}
.app-shell {
  background-color: #0c0d16;
  background-image: linear-gradient(135deg, #0c0d16d9, #141126c9), url('/background.jpg');
  background-position: center top;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}
.app-shell > .app-topbar { display: none; }
.app-navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  border-bottom: 1px solid #ffffff12;
  background-color: #171a28;
  background-image: linear-gradient(110deg, #171a28eF, #171a28d9), url('/background.jpg');
  background-position: center top;
  background-attachment: fixed;
  background-size: cover;
  box-shadow: 0 12px 30px #080b1829;
  backdrop-filter: blur(18px);
}
.app-navbar-inner {
  display: flex;
  width: calc(100% - 64px);
  max-width: 1440px;
  min-height: 76px;
  align-items: center;
  gap: 48px;
  margin: 0 auto;
}
.app-navbar-brand {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 11px;
  color: #f5f4fb;
  text-decoration: none;
}
.app-navbar-brand-mark {
  display: grid;
  width: 39px;
  height: 39px;
  place-items: center;
  border: 1px solid #ffffff36;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(145deg, #9b84ff, #654ce0);
  box-shadow: 0 5px 16px #7157df50;
  font-family: Georgia, serif;
  font-size: 30px;
  font-style: italic;
  line-height: 1;
}
.app-navbar-brand-copy { display: grid; gap: 3px; }
.app-navbar-brand-copy strong { font-size: 17px; font-weight: 700; letter-spacing: -.35px; }
.app-navbar-brand-copy small { color: #9297ab; font-size: 12px; font-weight: 700; letter-spacing: 1.15px; }
.app-navbar-nav { display: flex; height: 76px; align-items: center; gap: 7px; }
.app-navbar-link {
  position: relative;
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  gap: 9px;
  padding: 0 14px;
  border: 1px solid transparent;
  border-radius: 9px;
  color: #a7aabc;
  background: transparent;
  font-size: 14px;
  font-weight: 550;
  transition: color .18s, background .18s, border-color .18s;
}
.app-navbar-link:hover { color: #f1efff; background: #ffffff0b; }
.app-navbar-link.active {
  border-color: #9c87ff25;
  color: #e5deff;
  background: linear-gradient(120deg, #8168ef2a, #6b5ad719);
}
.app-navbar-link.active::after {
  position: absolute;
  right: 14px;
  bottom: -18px;
  left: 14px;
  height: 2px;
  border-radius: 2px;
  background: #9c87ff;
  box-shadow: 0 0 12px #9c87ff80;
  content: '';
}
.app-navbar-actions { display: flex; align-items: center; gap: 12px; margin-left: auto; }
.app-navbar .app-notification-button {
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff18;
  border-radius: 11px;
  color: #c3c6d4;
  background: #ffffff08;
  cursor: pointer;
  transition: color .18s, background .18s, border-color .18s;
}
.app-navbar .app-notification-button:hover,
.app-navbar .notification-dropdown[open] > summary { border-color: #ffffff2b; color: #fff; background: #ffffff12; }
.app-navbar .app-notification-button > span { top: 8px; right: 9px; border-color: #171a28; }
.app-navbar .app-navbar-profile {
  display: flex;
  min-height: 48px;
  align-items: center;
  gap: 10px;
  padding: 4px 8px;
  border: 1px solid transparent;
  border-radius: 11px;
  color: #f2f2f7;
  background: transparent;
  cursor: pointer;
  transition: background .18s, border-color .18s;
}
.app-navbar .app-navbar-profile:hover,
.app-navbar .profile-dropdown[open] > summary { border-color: #ffffff17; background: #ffffff0a; }
.app-navbar-profile-identity { display: grid; gap: 3px; text-align: left; }
.app-navbar-profile-name { color: #e7e8ef; font-size: 12px; font-weight: 600; }
.app-navbar-profile-role { color: #989daf; font-size: 12px; }
.app-navbar .app-navbar-profile > svg { color: #9095a8; transition: transform .18s; }
.app-navbar .app-avatar { width: 34px; height: 34px; border-color: #ffffff30; color: #fff; background: linear-gradient(145deg, #e19b76, #985e91); }
.app-navbar .profile-card { top: calc(100% + 10px); }
.app-navbar-logout {
  display: flex;
  width: 100%;
  min-height: 38px;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  padding: 0 8px;
  border: 0;
  border-top: 1px solid #ffffff16;
  border-radius: 0 0 7px 7px;
  color: #d3a9b0;
  background: transparent;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
}
.app-navbar-logout:hover { color: #ffd9df; background: #ffffff0a; }
.content-page { width: min(100%, 1440px); margin: 28px auto 0; }

@media (max-width: 760px) {
  .app-navbar-inner { width: calc(100% - 40px); gap: 22px; }
  .app-navbar-nav { flex: 1 1 auto; gap: 2px; }
  .app-navbar-link { gap: 6px; padding: 0 8px; font-size: 12px; }
  .app-navbar-actions { gap: 6px; }
}
@media (max-width: 600px) {
  .app-shell .main-area { min-height: calc(100vh - 112px); padding: 0 14px 28px; }
  .app-navbar-inner {
    width: calc(100% - 28px);
    min-height: 108px;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 0;
    padding: 10px 0 7px;
  }
  .app-navbar-brand { gap: 8px; }
  .app-navbar-brand-mark { width: 34px; height: 34px; border-radius: 10px; font-size: 26px; }
  .app-navbar-brand-copy strong { font-size: 15px; }
  .app-navbar-brand-copy small { font-size: 12px; }
  .app-navbar-actions { gap: 6px; margin-left: 0; }
  .app-navbar .app-notification-button { width: 36px; height: 36px; }
  .app-navbar .app-navbar-profile { min-height: 40px; gap: 6px; padding: 2px; }
  .app-navbar .app-avatar { width: 31px; height: 31px; }
  .app-navbar-profile-name, .app-navbar-profile > svg { display: none; }
  .app-navbar-nav { order: 3; width: 100%; height: 43px; justify-content: flex-start; gap: 7px; }
  .app-navbar-link { min-height: 35px; padding: 0 12px; font-size: 12px; }
  .app-navbar-link.active::after { right: 12px; bottom: -5px; left: 12px; }
  .content-page { margin-top: 20px; }
}
@media (max-width: 370px) {
  .app-navbar-inner { width: calc(100% - 22px); }
  .app-navbar-brand-copy small { letter-spacing: .8px; }
  .app-navbar-link { gap: 5px; padding: 0 8px; }
  .app-navbar-profile-role { display: none; }
}
.matrix-page { display: grid; max-width: 1440px; gap: 20px; margin: 30px auto 0; }
.matrix-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; }
.matrix-kicker { display: inline-flex; align-items: center; gap: 7px; color: #b6a8ff; font-size: 12px; font-weight: 750; letter-spacing: 1px; }
.matrix-heading h1 { margin: 9px 0 5px; color: #f1f0f8; font-size: 27px; font-weight: 700; letter-spacing: -.7px; }
.matrix-heading p { margin: 0; color: #a7aabc; font-size: 12px; line-height: 1.6; }
.matrix-published-count { display: inline-flex; min-height: 34px; align-items: center; gap: 7px; padding: 0 11px; border: 1px solid #ffffff18; border-radius: 8px; color: #c9c4e6; background: #ffffff09; font-size: 12px; white-space: nowrap; }
.matrix-summary { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 13px; }
.matrix-summary-card { position: relative; display: flex; min-width: 0; min-height: 90px; align-items: center; gap: 12px; padding: 15px; border: 1px solid #ffffff16; border-radius: 12px; background: linear-gradient(145deg, #ffffff10, #ffffff07); box-shadow: 0 8px 22px #04061018; }
.matrix-summary-icon { display: grid; width: 38px; height: 38px; flex: 0 0 auto; place-items: center; border: 1px solid #ffffff16; border-radius: 10px; color: #b6a5ff; background: #9c83ff19; }
.matrix-summary-card > span:nth-child(2) { display: grid; min-width: 0; gap: 5px; }
.matrix-summary-card small { overflow: hidden; color: #a6a9b9; font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
.matrix-summary-card strong { color: #f4f3f8; font-size: 22px; font-weight: 700; line-height: 1; }
.matrix-summary-trend { position: absolute; top: 14px; right: 13px; color: #85899c; }
.matrix-comments .matrix-summary-icon { color: #ff9aaf; background: #ef708c19; }
.matrix-likes .matrix-summary-icon { color: #f3a5cc; background: #db66a819; }
.matrix-shares .matrix-summary-icon { color: #72d6bd; background: #52c3a419; }
.matrix-table-card { overflow: hidden; border: 1px solid #ffffff18; border-radius: 13px; background: #171a28d9; box-shadow: 0 12px 30px #04061029; backdrop-filter: blur(12px); }
.matrix-table-heading { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding: 18px 20px; border-bottom: 1px solid #ffffff12; }
.matrix-table-heading h2 { margin: 0; color: #efeff5; font-size: 15px; font-weight: 650; }
.matrix-table-heading p { margin: 5px 0 0; color: #999daf; font-size: 12px; }
.matrix-table-heading > span { color: #bcb3ed; font-size: 12px; white-space: nowrap; }
.matrix-table-scroll { overflow-x: auto; }
.matrix-table { width: 100%; border-collapse: collapse; text-align: left; }
.matrix-table th { padding: 12px 14px; border-bottom: 1px solid #ffffff12; color: #9fa3b4; font-size: 12px; font-weight: 600; white-space: nowrap; }
.matrix-table th svg { margin-right: 4px; vertical-align: -3px; }
.matrix-table td { padding: 13px 14px; border-bottom: 1px solid #ffffff0c; color: #b9bdca; font-size: 12px; white-space: nowrap; }
.matrix-table tbody tr:last-child td { border-bottom: 0; }
.matrix-table td:first-child { min-width: 230px; white-space: normal; }
.matrix-table td:first-child strong, .matrix-table td:first-child small { display: block; }
.matrix-table td:first-child strong { color: #ececf3; font-size: 12px; font-weight: 600; line-height: 1.5; }
.matrix-table td:first-child small { margin-top: 3px; color: #9196a8; font-size: 12px; }
.matrix-platform { display: inline-flex; padding: 5px 8px; border: 1px solid #ffffff14; border-radius: 999px; color: #d3d5df; background: #ffffff08; font-size: 12px; }
.matrix-platform.platform-youtube { color: #ff9a9f; background: #ff6b7013; }
.matrix-platform.platform-instagram { color: #f0a3ce; background: #e767a311; }
.matrix-platform.platform-tiktok { color: #dcdeeb; background: #ffffff0c; }
.matrix-platform.platform-linkedin { color: #91c8ff; background: #51aaff12; }
.matrix-table .matrix-number { color: #e7e5f1; font-variant-numeric: tabular-nums; text-align: right; }
.matrix-total-row { background: #ffffff07; }
.matrix-total-row td { border-top: 1px solid #ffffff17; }
.matrix-total-row td:first-child { color: #d4d2e0; }
.matrix-total-row td strong { font-weight: 700; }
.matrix-empty { display: grid; justify-items: center; gap: 8px; padding: 48px 20px; text-align: center; }
.matrix-empty > span { display: grid; width: 44px; height: 44px; place-items: center; border: 1px solid #a48aff2b; border-radius: 12px; color: #b8a6ff; background: #9c83ff15; }
.matrix-empty > strong { color: #e6e5ee; font-size: 12px; }
.matrix-empty p { max-width: 370px; margin: 0; color: #a3a6b5; font-size: 12px; line-height: 1.6; }
.kanban-locked-label { display: inline-flex; margin-top: 9px; color: #a9adbc; font-size: 12px; }
@media (max-width: 760px) {
  .matrix-page { gap: 14px; margin-top: 21px; }
  .matrix-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; }
  .matrix-summary-card { min-height: 77px; gap: 9px; padding: 12px; }
  .matrix-summary-icon { width: 34px; height: 34px; }
  .matrix-table-heading { padding: 15px; }
}
@media (max-width: 500px) {
  .matrix-heading { align-items: flex-start; flex-direction: column; gap: 11px; }
  .matrix-heading h1 { font-size: 24px; }
  .matrix-table th, .matrix-table td { padding-right: 11px; padding-left: 11px; }
}
`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <style>{inlineStyles}</style>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
