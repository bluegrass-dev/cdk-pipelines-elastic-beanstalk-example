import { CfnOutput, Stack, Construct, StackProps } from "@aws-cdk/core";
import * as elasticBeanstalk from "@aws-cdk/aws-elasticbeanstalk";

export interface ApplicationProps extends StackProps {
  ApplicationName: string;
}

export class BeanstalkApplicationStack extends Stack {
  public readonly applicationName: CfnOutput;

  constructor(scope: Construct, id: string, props: ApplicationProps) {
    super(scope, id, props);

    const application = new elasticBeanstalk.CfnApplication(
      this,
      "Application",
      {
        applicationName: props.ApplicationName,
      }
    );

    this.applicationName = new CfnOutput(this, "ApplicationName", {
      value: props.ApplicationName,
    });
  }
}
