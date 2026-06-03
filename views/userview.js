function renderUser(user) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <title>User Profile</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-slate-100 min-h-screen flex items-center justify-center">

        <div class="bg-white rounded-2xl shadow-md p-8 w-96">
            <div class="flex items-center gap-4 mb-6">
                <div class="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                    ${user.name[0].toUpperCase()}
                </div>

                <div>
                    <h1 class="text-xl font-bold">${user.name}</h1>
                    <p class="text-gray-500">User ID: ${user.id}</p>
                </div>
            </div>

            <div class="border-t pt-4">
                <p><span class="font-semibold">Name:</span> ${user.name}</p>
                <p><span class="font-semibold">ID:</span> ${user.id}</p>
            </div>
        </div>

    </body>
    </html>
    `;
}

module.exports = { renderUser };