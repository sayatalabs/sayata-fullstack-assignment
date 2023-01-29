import { Navbar, Stack } from "react-bootstrap";

const PageHeader: React.FC = () => {
  const width = "100px";
  return (
    <Navbar>
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
        <Stack direction="horizontal">
          <p
            style={{
              fontSize: "16px",
              width: width,
              height: "33px",
              fontFamily: "Open Sans",
              fontWeight: "600",
              letterSpacing: "0.39px",
              lineHeight: "33px",
              marginBottom: "-6px",
            }}
          >
            Submissions
          </p>
          <div
            style={{
              height: "6px",
              width: width,
              backgroundColor: "#56C3D0",
              marginTop: "0px",
            }}
          />
          <p id="logo" className="d-inline-block">
            <img src="../images/logo.png" alt="bug" />
          </p>
        </Stack>
      </div>
    </Navbar>
  );
};

export default PageHeader;
