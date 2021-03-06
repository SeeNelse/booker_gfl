const sendQuery = require('./sendQuery');

module.exports = class UserDB {

  getUsers() {
    let query = `
    SELECT
    booker_users.user_id, 
    booker_users.user_name, 
    booker_users.status, 
    booker_users.role_id, 
    booker_users.user_email, 
    booker_roles.role_name
    FROM booker_users
    INNER JOIN booker_roles
    ON booker_users.role_id = booker_roles.role_id;`;
    return sendQuery(query);
  }

  blockUser(user) {
    let query = `
      UPDATE booker_users 
      SET status = '${user.status === 'active' ? 'not_active' : 'active'}' 
      WHERE user_id = ${user.id};`;
    return sendQuery(query);
  }

}