import React from 'react';
import LoaderSpinner from "react-loader-spinner";

const Loader = () => {
  return (
    <React.Fragment>
      <div className="main-loader">
        <LoaderSpinner
          type="Puff"
          color="cyan"
          height={100}
          width={100}
        />
        <p style={{marginTop: 20}}>Loading...</p>
      </div>
    </React.Fragment>
  )
}

export default Loader;