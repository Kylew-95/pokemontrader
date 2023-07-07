import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export const supabase = createClient(
  process.env.REACT_APP_POKE_SB_URL,
  process.env.REACT_APP_POKE_SB_KEY
);

export default function SupabaseLogin() {
  const [userId, setUserId] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUserId(session?.user.id);
    });

    return () => subscription.unsubscribe();
  }, [userId]);

  if (!session) {
    return (
      <div className="totalSignup">
        <div className="dummyDiv"></div>
        <h1 className="moreInfo">
          Sign up as a shelter. Once you have been verified as a partner, you
          will be able to list your organization's dogs for adoption!
        </h1>
        <div className="supabase-login">
          <Auth supabaseClient={supabase} theme={ThemeSupa} />
        </div>
      </div>
    );
  } else {
    return <div>{/* Render your authenticated content */}</div>;
  }
}
