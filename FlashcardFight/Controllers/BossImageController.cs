﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FlashcardFight.Models;
using FlashcardFight.Repositories;

namespace FlashcardFight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BossImageController : ControllerBase
    {
        private readonly IBossImageRespository _bossImageRepository;
        public BossImageController(IBossImageRespository bossImageRepository)
        {
            _bossImageRepository = bossImageRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_bossImageRepository.GetAll());
        }
    }
}
