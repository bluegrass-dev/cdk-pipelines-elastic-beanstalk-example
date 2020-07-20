import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as example from "../lib/cdk-pipelines-elastic-beanstalk-example-stack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new example.CdkPipelinesElasticBeanstalkExampleStack(
    app,
    "MyTestStack",
    {
      GitHubOwner: "test",
      GitHubRepo: "repo",
    }
  );
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT
    )
  );
});
