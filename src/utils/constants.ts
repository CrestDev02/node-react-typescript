export const constants = {
    server:{
        url:'http://localhost:8080/api/V1',
        github_url:'https://api.github.com/users/'
    },
    tokens:{
      github:"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"
    },
    validation:{
        name: { isValid: false, message: "" },
        email: { isValid: false, message: "" },
        password: { isValid: false, message: "" },
        confirm_password: {
          isValid: false,
          message: "",
        },
        github_username: {
          isValid: false,
          message: "",
        },
      }
}