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
            
            if (profile.Deactivated == true)
            {
                return NotFound();
            }

            return Ok(profile);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetUserProfiles());
        }

        [HttpGet("Leaderboard")]
        public IActionResult GetLeaderboard()
        {
            return Ok(_userProfileRepository.GetLeaderBoard());
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.JoinDate = DateTime.Now;
            userProfile.UserTypeId = 2;
            userProfile.Level = 1;
            userProfile.Experience = 0;
            userProfile.HP = 500;
            userProfile.MaxHP = 500;
            userProfile.ExpToNextLevel = 1000;
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
            var profile = GetCurrentUserProfile();
            userProfile.Id = profile.Id;
            userProfile.Email = profile.Email;
            userProfile.UserName = profile.UserName;

            _userProfileRepository.UpdateUserCharacterStats(userProfile);
            return NoContent();
        }

        [HttpPut("DeactivateUserById/{id}")]
        public IActionResult DeactivateUserById(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.UserTypeId != 1)
            {
                return BadRequest();
            };

            _userProfileRepository.DeactivateUserById(id);
            return NoContent();
        }

        [HttpPut("ReactivateUserById/{id}")]
        public IActionResult ReactivateUserById(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.UserTypeId != 1)
            {
                return BadRequest();
            };

            _userProfileRepository.ReactivateUserById(id);
            return NoContent();
        }

        [HttpGet("GetUserProfileById/")]
        public IActionResult GetUserProfileById()
        {
            var currentUserProfile = GetCurrentUserProfile();
            return Ok(_userProfileRepository.GetUserProfileById(currentUserProfile.Id));
        }

        [HttpGet("GetUserProfileDetailsById/{id}")]
        public IActionResult GetUserProfileDetailsById(int id)
        {
            return Ok(_userProfileRepository.GetUserProfileById(id));
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
