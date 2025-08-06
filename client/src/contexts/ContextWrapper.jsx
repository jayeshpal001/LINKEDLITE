
import { AuthProvider } from "./AuthContext";
import { PostProvider } from "./PostContext";
import { UIProvider } from "./UIContext";
export const ContextWrapper = ({ children }) => {
  return (
    <UIProvider>
    <AuthProvider>
        <PostProvider>
          {children}
        </PostProvider>
    </AuthProvider>
    </UIProvider>
  );
};
