import Extend from "flarum/common/extenders";
import app from "flarum/admin/app";

export default [
  new Extend.Admin()
    .setting(() => ({
      setting: "v17development-third-party-login-only.replaceLoginWithFoFPassport",
      label: "Replace Sign In and Sign Up button",
      help: (
        <span>
          Replace Sign In and Sign Up button with FoF Passport login (OAuth).{" "}
          <a
            href="https://community.v17.dev/knowledgebase/41"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more.
          </a>
        </span>
      ),
      type: "boolean",
    }))

    .setting(() => ({
      setting: "v17development-third-party-login-only.allowChangeMail",
      label: "Allow user to change their email",
      help: (
        <span>
          Allow user to change their email via user account settings.{" "}
          <a
            href="https://community.v17.dev/knowledgebase/42"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more.
          </a>
        </span>
      ),
      type: "boolean",
    }))

    .setting(() => ({
      setting: "v17development-third-party-login-only.forgotPasswordLink",
      label: "Forgot password link",
      help: (
        <span>
          Replaces the forgot password link, only available if the login and
          registration forms aren't replaced.{" "}
          <a
            href="https://community.v17.dev/knowledgebase/43"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more.
          </a>
        </span>
      ),
      type: "text",
    }))

    .setting(() => ({
      setting: "v17development-third-party-login-only.changePasswordLink",
      label: "Change password link",
      help: (
        <span>
          Replaces the account "Change password" button.{" "}
          <a
            href="https://community.v17.dev/knowledgebase/43"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more.
          </a>
        </span>
      ),
      type: "text",
    }))

    .setting(() => ({
      setting: "v17development-third-party-login-only.signUpWelcomeText",
      label: "New account welcome text",
      help: (
        <span>
          Give new users a warm welcome with a custom written welcome text.{" "}
          <a
            href="https://community.v17.dev/knowledgebase/44"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more.
          </a>
        </span>
      ),
      type: "text",
    })),
];
