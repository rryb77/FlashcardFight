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
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionRepository _questionRepository;
        public QuestionController(IQuestionRepository questionRepository)
        {
            _questionRepository = questionRepository;
        }

        [HttpPost]
        public IActionResult Post(Question question)
        {
            _questionRepository.AddQuestion(question);
            return CreatedAtAction("GetById", new { id = question.Id }, question);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return null;
        }

        [HttpPut]
        public IActionResult Put(Question question)
        {
            _questionRepository.UpdateQuestion(question);
            return NoContent();
        }
    }
}
