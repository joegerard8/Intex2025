import AuthorizeView, { AuthorizedUser } from "../AuthorizeView";
import Logout from "../Logout";

function HomePage() {
  return (
    <AuthorizeView>
      <div>
        <span>
          <Logout>
            Logout <AuthorizedUser value="email" />
          </Logout>
        </span>
        <h1>Welcome to the Home Page</h1>
        <p>This is the main page of our application.</p>
      </div>
    </AuthorizeView>
  );
}
export default HomePage;
