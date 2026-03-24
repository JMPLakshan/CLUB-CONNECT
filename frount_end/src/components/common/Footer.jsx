function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        © 2026 Campus Society Connect. All rights reserved.
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "#1e3a8a",
    color: "white",
    textAlign: "center",
    padding: "15px 10px",
    marginTop: "30px",
  },
  text: {
    margin: 0,
    fontSize: "14px",
  },
};

export default Footer;