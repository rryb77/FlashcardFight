using FlashcardFight.Models;
using FlashcardFight.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FlashcardFight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlashCardSetController : ControllerBase
    {
        private readonly IFlashCardSetRepository _flashCardSetRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public FlashCardSetController(IFlashCardSetRepository flashCardSetRepository, IUserProfileRepository userProfileRepository)
        {
            _flashCardSetRepository = flashCardSetRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpPost]
        public IActionResult Post(FlashCardSet flashCardSet)
        {
            //var currentUserProfile = GetCurrentUserProfile();

            flashCardSet.CreateDateTime = DateTime.Now;
            flashCardSet.BossImageId = 1;
            flashCardSet.CreatorId = 1;
            //flashCardSet.CreatorId = currentUserProfile.Id;
            _flashCardSetRepository.Add(flashCardSet);
            return CreatedAtAction("GetById", new { id = flashCardSet.Id }, flashCardSet);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_flashCardSetRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_flashCardSetRepository.GetById(id));
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
