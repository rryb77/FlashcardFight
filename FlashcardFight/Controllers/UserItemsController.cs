using FlashcardFight.Models;
using FlashcardFight.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlashcardFight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserItemsController : ControllerBase
    {
        private readonly IUserItemRepository _userItemRepository;
        public UserItemsController(IUserItemRepository userItemRepository)
        {
            _userItemRepository = userItemRepository;
        }

        [HttpPost]
        public IActionResult Post(UserItems userItems)
        {
            _userItemRepository.AddUserItem(userItems);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userItemRepository.DeleteUserItem(id);
            return NoContent();
        }
    }
}
