import { BaseToast, ErrorToast } from "react-native-toast-message";

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#4CAF50",
        backgroundColor: props.props?.backgroundColor,
        borderColor: props.props?.borderColor,
      }}
      text1Style={props.text1Style}
      text2Style={props.text2Style}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#F44336",
        backgroundColor: props.props?.backgroundColor,
        borderColor: props.props?.borderColor,
      }}
      text1Style={props.text1Style}
      text2Style={props.text2Style}
    />
  ),
};

export default toastConfig;
