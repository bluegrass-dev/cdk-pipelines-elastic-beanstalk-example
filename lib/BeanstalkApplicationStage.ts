import { Stage, CfnOutput, Construct, StageProps } from "@aws-cdk/core";
import { BeanstalkApplicationStack } from "./BeanstalkApplicationStack";

export interface BeanstalkApplicationStageProps extends StageProps {
  ApplicationName: string;
}

export class BeanstalkApplicationStage extends Stage {
  public readonly ApplicationName: CfnOutput;
  constructor(
    scope: Construct,
    id: string,
    props: BeanstalkApplicationStageProps
  ) {
    super(scope, id, props);

    const application = new BeanstalkApplicationStack(
      this,
      "ApplicationStack",
      {
        ApplicationName: props.ApplicationName,
      }
    );

    this.ApplicationName = new CfnOutput(this, "ApplicationName", {
      value: application.applicationName.toString(),
    });
  }
}
