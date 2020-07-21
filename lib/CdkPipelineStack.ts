import * as codepipeline from "@aws-cdk/aws-codepipeline";
import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import { SecretValue, Stack, Construct, StackProps } from "@aws-cdk/core";

export interface CdkPipelineToBeanstalkStackProps extends StackProps {
  GitHubOwner: string;
  GitHubRepo: string;
}

export class CdkPipelineStack extends Stack {
  public cdkPipeline: CdkPipeline;

  constructor(
    scope: Construct,
    id: string,
    props: CdkPipelineToBeanstalkStackProps
  ) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();
    this.cdkPipeline = new CdkPipeline(this, "Pipeline", {
      // The pipeline name
      pipelineName: "CDKPipelineToBeanstalk",
      cloudAssemblyArtifact,

      // Where the source can be found
      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: "GitHub",
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager("github-token"),
        owner: props.GitHubOwner,
        repo: props.GitHubRepo,
        trigger: codepipeline_actions.GitHubTrigger.POLL,
      }),

      // How it will be built and synthesized
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,

        // We need a build step to compile the TypeScript Lambda
        buildCommand: "npm run build",
      }),
    });
  }
}
