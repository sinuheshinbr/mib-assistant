import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import toCoordinates from "./coordinates";

export default function ScrollDialog() {
  const [copySuccess, setCopySuccess] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [list, setList] = React.useState([]);
  const textAreaRef = React.useRef(null);

  const handleClickOpen = (scrollType) => () => {
    setCopySuccess("");
    setOpen(true);
    setScroll(scrollType);
    let newList = JSON.parse(localStorage.getItem("list"));
    if (newList) {
      setList(newList);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setList([]);
  };

  const copyToClipboard = () => {
    let el = textAreaRef.current;
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand("copy");
    setCopySuccess("Text copied to your clipboard!");
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen("paper")}>
        <FileCopyIcon className="icon" />
        Personal.map
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          Copy this in your C:/Program Files (x86)/UOAM/Personal.map file{" "}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            component={"span"}
            id="scroll-dialog-description"
            ref={textAreaRef}
            tabIndex={-1}
          >
            <div>
              {list.map((obj, index) => {
                return <div key={index}>{toCoordinates(obj)}</div>;
              })}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <span>{copySuccess}</span>
          <Button onClick={copyToClipboard} variant="contained">
            <FileCopyIcon className="icon" />
          </Button>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
