import {
  expect as expectCDK,
  matchTemplate,
  MatchStyle,
} from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as example from "../lib/CdkPipelineStack";

test("Empty Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new example.CdkPipelineStack(app, "MyTestStack", {
    GitHubOwner: "test",
    GitHubRepo: "repo",
    ApplicationName: "test",
    SolutionStackName: "test",
  });
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
