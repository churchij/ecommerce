using ecommerce.Data;
using ecommerce.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ecommerce.Controllers {

    [ApiController] //mark as API
    public class UsersController : ControllerBase {

        private readonly ecommerceContext context; //hold ref to data context

        public UsersController(ecommerceContext context) { //init controller
            this.context = context; //init db context from dependancy injector
        }

        [HttpGet] //set verb type
        [Route("/api/v1/Users")] //set path to API using attribute routing
        public IActionResult GetUsers() { //name method
            var users = this.context.users.ToList(); //get all users from database
            return Ok(users);
        }

        [HttpPost] //set verb type
        [Route("/api/v1/Users")] //set path to API using attribute routing
        public IActionResult PostUser([FromBody] users users) { //name method

            context.users.Add(users);
            context.SaveChanges();
            return Ok(users);
        }

        [HttpPut] //set verb type
        [Route("/api/v1/Users")] //set path to API using attribute routing
        public IActionResult PutUser([FromBody] users users) { //name method

            var user = context.users.Where(c => c.userId == users.userId).FirstOrDefault();

            if (!String.IsNullOrWhiteSpace(users.firstName)) { 
                user.firstName = users.firstName;
            }
            if (!String.IsNullOrWhiteSpace(users.lastName)) {
                user.lastName = users.lastName;
            }
            if (!String.IsNullOrWhiteSpace(users.password)) {
                user.password = users.password;
            }
            if (!String.IsNullOrWhiteSpace(users.emailAddress)) {
                user.emailAddress = users.emailAddress;
            }

            context.SaveChanges();
           
            return Ok(users);
        }

        [HttpDelete] //set verb type
        [Route("/api/v1/Users/userId/{userId}")] //set path to API using attribute routing
        public IActionResult DeleteUser(int userId) { //name method

            var user = context.users.Where(c => c.userId == userId).FirstOrDefault();
            context.users.Remove(user);
            context.SaveChanges();

            return Ok(userId);
        }
    }
}
