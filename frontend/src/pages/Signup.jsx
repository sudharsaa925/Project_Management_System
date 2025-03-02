import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";
import { useState } from "react";
import signupBackground from "../assets/signup_bg.mp4"; // Import video

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover; /* Ensures video fully covers screen */
  z-index: -1;
  filter: brightness(0.85); /* Slight dim for better readability */
  background-color: black; /* Fallback if video doesn't load */
`;

const Box = styled.div`
  background: rgba(255, 255, 255, 0.85);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 320px;
  z-index: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: ${(props) => (props.disabled ? "#ccc" : "#ff4b2b")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#e03e1a")};
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const StyledLink = styled.p`
  margin-top: 10px;
  font-size: 14px;

  a {
    color: #ff4b2b;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Signup failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {/* Video Background */}
      <VideoBackground autoPlay loop muted playsInline>
        <source src={signupBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>

      <Box>
        <h2>Sign Up</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignup} disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        <StyledLink>
          Already have an account? <Link to="/login">Login</Link>
        </StyledLink>
      </Box>
    </Container>
  );
}

export default Signup;
