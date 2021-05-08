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
        private readonly IBossImageRepository _bossImageRepository;

        public FlashCardSetController(IFlashCardSetRepository flashCardSetRepository, 
                                      IUserProfileRepository userProfileRepository,
                                      IBossImageRepository bossImageRepository)
        {
            _flashCardSetRepository = flashCardSetRepository;
            _userProfileRepository = userProfileRepository;
            _bossImageRepository = bossImageRepository;

        }

        [HttpPost]
        public IActionResult Post(FlashCardSet flashCardSet)
        {
            var currentUserProfile = GetCurrentUserProfile();
            
            var bossImage = _bossImageRepository.GetRandom();
            flashCardSet.BossImageId = bossImage.Id;

            flashCardSet.CreateDateTime = DateTime.Now;
            flashCardSet.CreatorId = currentUserProfile.Id;

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

        [HttpGet("GetAllWithoutUserSubscriptions/{id}")]
        public IActionResult GetWithoutUserSubscription(int id)
        {
            return Ok(_flashCardSetRepository.GetAllWithoutSubscriptions(id));
        }

        [HttpGet("GetAllWithoutUserSubscriptionsFilteredByCategory/{id}/{categoryId}")]
        public IActionResult GetWithoutUserSubsFilteredByCategory(int id, int categoryId)
        {
            return Ok(_flashCardSetRepository.GetAllWithoutSubscriptionsSorted(id, categoryId));
        }

        [HttpGet("GetAllWithoutUserSubsFilteredByDifficulty/{id}/{difficultyId}")]
        public IActionResult GetWithoutUserSubsFilteredByDifficulty(int id, int difficultyId)
        {
            return Ok(_flashCardSetRepository.GetAllWithoutSubsFilteredByDifficulty(id, difficultyId));
        }

        [HttpGet("GetAllWithoutUserSubsFilteredByCategoryAndDifficulty/{id}/{difficultyId}/{categoryId}")]
        public IActionResult GetWithoutUserSubsFilteredByDifficulty(int id, int difficultyId, int categoryId)
        {
            return Ok(_flashCardSetRepository.GetAllWithoutSubsFilteredByCategoryAndDifficulty(id, difficultyId, categoryId));
        }

        [HttpGet("GetAllBySubscription/{id}")]
        public IActionResult GetAllBySubscription(int id)
        {
            return Ok(_flashCardSetRepository.GetAllBySubscription(id));
        }

        [HttpGet("GetAllByUserId/{id}")]
        public IActionResult GetAllByUserId(int id)
        {
            return Ok(_flashCardSetRepository.GetAllByUserId(id));
        }

        [HttpGet("UserSets")]
        public IActionResult GetUserSet()
        {
            var currentUserProfile = GetCurrentUserProfile();
            return Ok(_flashCardSetRepository.GetAllByUserId(currentUserProfile.Id));
        }

        [HttpGet("GetWithQuestionsAndAnswers/{id}")]
        public IActionResult GetByIdWithQuestionsAndAnswers(int id)
        {
            return Ok(_flashCardSetRepository.GetByIdWithQuestionsAndAnswers(id));
        }

        [HttpPut("{id}")]
        public IActionResult Put(FlashCardSet flashCardSet)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if(currentUserProfile.Id == flashCardSet.CreatorId || currentUserProfile.UserTypeId == 1)
            {
                _flashCardSetRepository.UpdateFlashcard(flashCardSet);
            }
            else
            {
                return BadRequest();
            }

            
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _flashCardSetRepository.DeleteFlashcardSet(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
