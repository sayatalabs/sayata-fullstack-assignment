function UpperHeader() {
  return (
    <div
      className="rectangle-2"
      style={{
        height: "95px",
        width: "1920px",
        background:
          "linear-gradient(36.07deg, #457378 0%, #0EABB7 55.47%, #18B4BB 74.65%, #53EAD1 100%)",
        display: "table",
      }}
    >
      <div
        className="rectangle-3"
        style={{
          height: "38px",
          width: "157px",
        }}
      >
        <p
          className="submissions"
          style={{
            height: "33px",
            width: "149px",
            color: "#FFFFFF",
            fontFamily: "Open Sans",
            fontSize: "24px",
            fontWeight: "600",
            letterSpacing: "0.39px",
            lineHeight: "33px",
            marginLeft: "33px",
            marginTop: "35px",
          }}
        >
          Submissions
        </p>
        <p
          className="rectangle"
          style={{
            height: "6px",
            width: "157px",
            borderRadius: "3px",
            backgroundColor: "#56C3D0",
          }}
        ></p>
      </div>
    </div>
  );
}

export default UpperHeader;
