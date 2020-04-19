import React from 'react'

function BlogFooter() {
  return (
    <div style={{display: 'flex'}}>
      <div
        style={{
          paddingRight: 20,
        }}
      >
        <img
          src="https://github.com/thiagozf.png"
          alt="Thiago Zanivan"
          style={{
            maxWidth: 80,
            borderRadius: '50%',
          }}
        />
      </div>
      <p>
        <strong>Thiago Zanivan</strong>
        {`
          is a brazilian software engineer. He's actively involved in the
          open source community as a maintainer and contributor of popular
          npm packages. Technologies he is currently working with includes
          Serverless, JavaScript and React.
        `}
      </p>
    </div>
  )
}

export default BlogFooter
