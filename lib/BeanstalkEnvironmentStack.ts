import { CfnOutput, Stack, Construct, StackProps } from "@aws-cdk/core";
import * as elasticBeanstalk from "@aws-cdk/aws-elasticbeanstalk";

export interface EnvironmentProps extends StackProps {
  EnvironmentName: string;
  ApplicationName: string;
  SolutionStackName: string;
}

export class BeanstalkEnvironmentStack extends Stack {
  public readonly environmentName: CfnOutput;
  public readonly environmentUrl: CfnOutput;
  constructor(scope: Construct, id: string, props: EnvironmentProps) {
    super(scope, id, props);

    const optionSettingProperties: elasticBeanstalk.CfnEnvironment.OptionSettingProperty[] = [
      {
        namespace: "aws:ec2:instances",
        optionName: "EnableSpot",
        value: "true",
      },
      {
        namespace: "aws:ec2:instances",
        optionName: "InstanceTypes",
        value: "t2.micro,t3.micro,t3.small",
      },
      {
        namespace: "aws:ec2:instances",
        optionName: "SpotFleetOnDemandBase",
        value: "0",
      },
      {
        namespace: "aws:ec2:instances",
        optionName: "SpotFleetOnDemandAboveBasePercentage",
        value: "0",
      },
    ];

    const environment = new elasticBeanstalk.CfnEnvironment(
      this,
      "Environment",
      {
        environmentName: props.EnvironmentName,
        applicationName: props.ApplicationName,
        solutionStackName: props.SolutionStackName,
        optionSettings: optionSettingProperties,
      }
    );

    this.environmentName = new CfnOutput(this, "EnvironmentName", {
      value: props.EnvironmentName,
    });
    this.environmentUrl = new CfnOutput(this, "EnvironmentUrl", {
      value: this.environmentUrl.value,
    });
  }
}
