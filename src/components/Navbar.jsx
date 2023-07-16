import React from "react";

function Navbar() {
  return (
    <div className="chec navba mb-4 py-2">
      <div className="container">
        <div className="d-flex justify-content-around align-items-center" >
          <h5 className="m-0" >POWERED BY OPEN AI</h5>

          <button className="btn btn-dark">Text-to-Speech</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
