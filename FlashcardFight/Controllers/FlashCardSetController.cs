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
    public class FlashCardSetController : ControllerBase
    {
        private readonly IFlashCardSetRepository _flashCardSetRepository;
        public FlashCardSetController(IFlashCardSetRepository flashCardSetRepository)
        {
            _flashCardSetRepository = flashCardSetRepository;
        }

        [HttpPost]
        public IActionResult Post(FlashCardSet flashCardSet)
        {
            flashCardSet.CreateDateTime = DateTime.Now;
            _flashCardSetRepository.Add(flashCardSet);
            return CreatedAtAction("Get", new { id = flashCardSet.Id }, flashCardSet);
        }
    }
}
