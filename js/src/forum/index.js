import app from "flarum/forum/app";
import { extend, override } from "flarum/common/extend";

import LogInButton from "flarum/forum/components/LogInButton";

app.initializers.add(
  "luzzardik-flarum-third-party-login-only",
  () => {

    extend(
      "flarum/forum/components/LogInModal",
      "fields",
      function (items) {
        items.remove("identification");
        items.remove("password");
        items.remove("remember");
        items.remove("submit");
      }
    );


    extend(
      "flarum/forum/components/SignUpModal",
      "fields",
      function (items) {

        if (
          this.attrs.token &&
          app.forum.attribute("signUpWelcomeText")
        ) {
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
      }
    );


    override(
      "flarum/forum/components/LogInModal",
      "footer",
      function () {

        if (
          app.forum.attribute("forgotPasswordLink") === ""
        ) {
          return null;
        }

        return (
          <p className="LogInModal-forgotPassword">
            <a
              href={app.forum.attribute("forgotPasswordLink")}
              target="_blank"
              rel="noopener noreferrer"
            >
              {
                app.translator.trans(
                  "core.forum.log_in.forgot_password_link"
                )
              }
            </a>
          </p>
        );
      }
    );


    extend(
      "flarum/forum/components/HeaderSecondary",
      "items",
      function (items) {

        if (
          !app.forum.attribute(
            "replaceLoginWithFoFPassport"
          )
        ) {
          return;
        }

        if (app.forum.attribute("allowSignUp")) {
          items.replace(
            "signUp",
            LogInButton.component(
              {
                className: "Button Button--link",
                path: "/auth/passport",
              },
              app.translator.trans(
                "core.forum.header.sign_up_link"
              )
            )
          );
        }


        items.replace(
          "logIn",
          LogInButton.component(
            {
              className: "Button Button--link",
              path: "/auth/passport",
            },
            app.translator.trans(
              "core.forum.header.log_in_link"
            )
          )
        );
      }
    );


    extend(
      "flarum/forum/components/SettingsPage",
      "accountItems",
      function (items) {

        if (
          app.forum.attribute("changePasswordLink")
        ) {
          items.replace(
            "changePassword",
            <a
              href={
                app.forum.attribute(
                  "changePasswordLink"
                )
              }
              target="_blank"
              rel="noopener noreferrer"
              className="Button"
            >
              {
                app.translator.trans(
                  "core.forum.settings.change_password_button"
                )
              }
            </a>
          );
        } else {
          items.remove("changePassword");
        }


        if (
          !app.forum.attribute("allowChangeMail")
        ) {
          items.remove("changeEmail");
        }
      }
    );

  }
);
