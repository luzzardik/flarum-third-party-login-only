import app from "flarum/forum/app";
import { extend, override } from "flarum/common/extend";

// 1. Import all the components you need to extend or use
import LogInButton from "flarum/forum/components/LogInButton";
import LogInModal from "flarum/forum/components/LogInModal";
import SignUpModal from "flarum/forum/components/SignUpModal";
import HeaderSecondary from "flarum/forum/components/HeaderSecondary";
import SettingsPage from "flarum/forum/components/SettingsPage";

app.initializers.add("luzzardik-flarum-third-party-login-only", () => {
  // 2. Extend the prototype of the imported classes
  extend(LogInModal.prototype, "fields", function (items) {
    items.remove("identification");
    items.remove("password");
    items.remove("remember");
    items.remove("submit");
  });

  extend(SignUpModal.prototype, "fields", function (items) {
    if (this.attrs.token && app.forum.attribute("signUpWelcomeText")) {
      items.add(
        "welcome-message",
        <p className="SignUpWelcomeText">
          {app.forum.attribute("signUpWelcomeText")}
        </p>,
        99
      );
    }

    if (!this.attrs.token) {
      items.remove("username");
      items.remove("email");
      items.remove("submit");
    }

    items.remove("password");
  });

  override(LogInModal.prototype, "footer", function () {
    if (app.forum.attribute("forgotPasswordLink") === "") {
      return null;
    }

    return (
      <p className="LogInModal-forgotPassword">
        <a
          href={app.forum.attribute("forgotPasswordLink")}
          target="_blank"
          rel="noopener noreferrer"
        >
          {app.translator.trans("core.forum.log_in.forgot_password_link")}
        </a>
      </p>
    );
  });

  extend(HeaderSecondary.prototype, "items", function (items) {
    if (!app.forum.attribute("replaceLoginWithFoFPassport")) {
      return;
    }

    // 3. Replace .component() with standard JSX syntax
    if (app.forum.attribute("allowSignUp")) {
      items.replace(
        "signUp",
        <LogInButton className="Button Button--link" path="/auth/passport">
          {app.translator.trans("core.forum.header.sign_up_link")}
        </LogInButton>
      );
    }

    items.replace(
      "logIn",
      <LogInButton className="Button Button--link" path="/auth/passport">
        {app.translator.trans("core.forum.header.log_in_link")}
      </LogInButton>
    );
  });

  extend(SettingsPage.prototype, "accountItems", function (items) {
    if (app.forum.attribute("changePasswordLink")) {
      items.replace(
        "changePassword",
        <a
          href={app.forum.attribute("changePasswordLink")}
          target="_blank"
          rel="noopener noreferrer"
          className="Button"
        >
          {app.translator.trans("core.forum.settings.change_password_button")}
        </a>
      );
    } else {
      items.remove("changePassword");
    }

    if (!app.forum.attribute("allowChangeMail")) {
      items.remove("changeEmail");
    }
  });
});
