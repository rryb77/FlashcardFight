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
    public class AnswerController : ControllerBase
    {
        private readonly IAnswerRepository _answerRepository;
        public AnswerController(IAnswerRepository answerRepository)
        {
            _answerRepository = answerRepository;
        }

        [HttpPost]
        public IActionResult Post(List<Answer> answers)
        {
            _answerRepository.AddAnswers(answers);
            return NoContent();
        }

        [HttpPut]
        public IActionResult Put(List<Answer> answers)
        {
            _answerRepository.UpdateAnswers(answers);
            return NoContent();
        }
    }
}
