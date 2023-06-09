import React from "react";

const WindowIcon = ({ func, ImageUrl, IconName }) => {
  return (
    <div>
      <button
        style={{
          background: "transparent",
          borderWidth: "0px",
          paddingTop: "10px",
          width: "120px",
        }}
        onClick={func}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "50px",
              display: "inline-block",
              verticalAlign: "middle",
            }}
          >
            <img src={ImageUrl} />
          </div>
          <span
            style={{
              color: "white",
              paddingLeft: "8px",
              fontFamily: "dunggeunmo-bold",
              fontSize: "20px",
              zIndex: 0,
            }}
          >
            {IconName}
          </span>
        </div>
      </button>
    </div>
  );
};

export default WindowIcon;
