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
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _itemRepository;
        public ItemController(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_itemRepository.GetAll());
        }

        [HttpGet("GetUserItems/{id}")]
        public IActionResult GetUserItems(int id)
        {
            return Ok(_itemRepository.GetAllUserItems(id));
        }
    }
}
