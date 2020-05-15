import * as aws from "aws-sdk";
import * as xray from "aws-xray-sdk";

// Do not enable tracing for 'invoke local'
const awsWrapped = process.env.IS_LOCAL ? aws : xray.captureAWS(aws);

export default awsWrapped;
