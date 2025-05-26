const { User } = require("../models/userModel");

module.exports = (bot) => {
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Prepare user data
    const userData = {
      telegram_id: userId,
      username: msg.from.username,
      first_name: msg.from.first_name,
      last_name: msg.from.last_name,
      is_bot: msg.from.is_bot,
      language_code: msg.from.language_code,
      chat_id: chatId,
    };

    // Check if user already exists
    let user = await User.findOne({ telegram_id: userId });

    if (!user) {
      try {
        user = await User.create(userData);
        console.log(
          "✅ New user saved:",
          userData.username || userData.first_name
        );
      } catch (error) {
        console.error("❌ Failed to save user:", error);
        return bot.sendMessage(
          chatId,
          "An error occurred while saving your data. Please try again."
        );
      }
    }

    // Send welcome message and inline buttons
    const welcomeMsg = `👋 Welcome to *Telegram Account Buyer Bot* \n\n🔐 You need to:\n- Set a secure login password 🔑\n- Confirm your password ✅\n- Connect your Tron wallet 🏦\n\n📨 Then submit your response for admin approval 👮‍♂️ `;

    bot.sendMessage(chatId, welcomeMsg, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "✅ Set Password", callback_data: "set_password" }],
          [{ text: "🔐 Confirm Password", callback_data: "confirm_password" }],
          [{ text: "🔗 Connect Tron Wallet", callback_data: "connect_wallet" }],
          [{ text: "📤 Submit Response", callback_data: "submit_response" }],
        ],
      },
    });
  });

  // /mainmenu Command
  bot.onText(/\/mainmenu/, (msg) => {
    const chatId = msg.chat.id;

    const menuMessage = `🏠 *Main Menu*\n\nPlease choose an option:`;
    bot.sendMessage(chatId, menuMessage, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "🛍 Buy Telegram Account", callback_data: "buy_account" }],
          [{ text: "📥 Upload Account File", callback_data: "upload_account" }],
          [
            { text: "💰 My Balance", callback_data: "check_balance" },
            { text: "👥 My Referrals", callback_data: "my_referrals" },
          ],

          [{ text: "🌍 Available Countries", callback_data: "view_countries" }],
          [{ text: "⚙️ Settings", callback_data: "settings" }],
        ],
      },
    });
  });

  // /admin Command
  bot.onText(/\/admin/, (msg) => {
    const chatId = msg.chat.id;

    const adminMsg = `🔧 *Admin Panel*\n\nSelect an admin action:`;
    bot.sendMessage(chatId, adminMsg, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "👤 View Pending Users",
              callback_data: "view_pending_users",
            },
          ],
          [
            { text: "✅ Approve Users", callback_data: "approve_users" },
            { text: "❌ Reject Users", callback_data: "reject_users" },
          ],

          [
            {
              text: "🌐 Manage Country Access",
              callback_data: "manage_countries",
            },
          ],
          [
            {
              text: "🔧 Add New Admin",
              callback_data: "set_admin",
            },
          ],
        ],
      },
    });
  });
};
