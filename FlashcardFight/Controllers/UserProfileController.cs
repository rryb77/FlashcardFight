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
    public class UserProfileController : ControllerBase
    {

        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            var profile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            return Ok(profile);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetUserProfiles());
        }
            

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.JoinDate = DateTime.Now;
            userProfile.UserTypeId = 2;
            userProfile.Level = 1;
            userProfile.Experience = 0;
            userProfile.HP = 500;
            userProfile.ExpToNextLevel = 1000;
            userProfile.CharacterImageId = 1;
            userProfile.Attempts = 0;
            userProfile.Wins = 0;
            userProfile.Deactivated = false;

            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }

        [HttpPut("UpdateUserCharacter")]
        public IActionResult UpdateUserCharacter(UserProfile userProfile)
        {
            _userProfileRepository.UpdateUserCharacterStats(userProfile);
            return NoContent();
        }
    }
}
