import React from 'react'

const GoogleAuth = () => {
  return (
    <div className="signIn">
      <div id="g_id_onload"
        data-client_id="618793947299-lrlk0trtc9qbej6b6f02vsuv15fh6o6n.apps.googleusercontent.com"
        data-context="use"
        data-ux_mode="popup"
        data-callback="handleAuthorizationResponse"
        data-auto_prompt="false">
      </div>

      <div className="g_id_signin"
          data-type="standard"
          data-shape="rectangular"
          data-theme="outline"
          data-text="signin_with"
          data-size="medium"
          data-logo_alignment="left">
      </div>
    </div>
  )
}

export default GoogleAuth