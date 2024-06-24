import HelpText from "./HelpText";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const ErrorAlert = () => (
  <Alert>
    <AlertTitle>Could not analyse steam account</AlertTitle>
    <AlertDescription>
      Check the steam ID to make sure it is correct. <HelpText />
    </AlertDescription>
  </Alert>
);

export default ErrorAlert;
