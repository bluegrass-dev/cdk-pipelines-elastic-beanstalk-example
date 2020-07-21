import { Stage, CfnOutput, Construct, StageProps } from "@aws-cdk/core";
import { BeanstalkEnvironmentStack } from "./BeanstalkEnvironmentStack";

export interface BeanstalkEnvironmentStageProps extends StageProps {
  ApplicationName: string;
  EnvironmentName: string;
  SolutionStackName: string;
}

export class BeanstalkEnvironmentStage extends Stage {
  constructor(
    scope: Construct,
    id: string,
    props: BeanstalkEnvironmentStageProps
  ) {
    super(scope, id, props);

    const environment = new BeanstalkEnvironmentStack(
      this,
      "DevEnvironmentStack",
      {
        ApplicationName: props.ApplicationName,
        EnvironmentName: `${props.ApplicationName}-${props.EnvironmentName}`,
        SolutionStackName: props.SolutionStackName,
      }
    );
  }
}
