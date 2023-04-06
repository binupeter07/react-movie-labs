import React from 'react'

const Loading = () => {
  return (
    <div className="loadingContainer">
    <div className="loadingContent">
      <div className="loadingOverlay"></div>
      <div className="loading-container">
        <span class="loader"></span>
      </div>
    </div>
  </div>
  )
}

export default Loading;