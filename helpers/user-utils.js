export async function createUser(email, password) {
  const response = await fetch("/api/auth/sign-up", {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function updatePassword(oldPassword, newPassword) {
  const response = await fetch("/api/user/update-password", {
    method: "PATCH",
    body: JSON.stringify({
      oldPassword: oldPassword,
      newPassword: newPassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

export async function deleteUser() {
  const response = await fetch("/api/user/delete-user", {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
      },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
