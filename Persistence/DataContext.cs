﻿using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Value>()
            .HasData(
                new Value(1, "Value 101"),
                new Value(2, "Value 102"),
                new Value(3, "Value 103")
            );

            // foreign key
            builder.Entity<UserActivity>(x => x.HasKey(ua =>
            new { ua.AppUserId, ua.ActivityId }));

            // One To One
            builder.Entity<UserActivity>()
                .HasOne(u => u.AppUser)
            // Plusieurs activités ont un user et plusieurs users ont des activités => Many to many
                .WithMany(a => a.UserActivities)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<UserActivity>()
                .HasOne(a => a.Activity)
                .WithMany(u => u.UserActivities)
                .HasForeignKey(a => a.ActivityId);
        }
    }
}
