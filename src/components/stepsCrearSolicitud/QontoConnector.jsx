import { withStyles, StepConnector } from "@material-ui/core";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#199479",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#199479",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
    transition: "all 1s",
  },
})(StepConnector);

export default QontoConnector;
