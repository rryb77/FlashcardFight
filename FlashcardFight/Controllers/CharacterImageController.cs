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
    public class CharacterImageController : ControllerBase
    {
        private readonly ICharacterImageRepository _characterImageRepository;
        public CharacterImageController(ICharacterImageRepository characterImageRepository)
        {
            _characterImageRepository = characterImageRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_characterImageRepository.GetCharacterImages());
        }
    }
}
