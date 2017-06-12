using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using WebApplicationBasic.Models;

namespace AzureToolkitWalkthrough.Migrations
{
    [DbContext(typeof(AzureToolkitContext))]
    [Migration("20170609090235_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebApplicationBasic.SavedImage", b =>
                {
                    b.Property<int>("SavedImageId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("StorageUrl");

                    b.Property<string>("UserId");

                    b.HasKey("SavedImageId");

                    b.ToTable("SavedImages");
                });

            modelBuilder.Entity("WebApplicationBasic.SavedImageTag", b =>
                {
                    b.Property<int>("SavedImageTagId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("SavedImageId");

                    b.Property<string>("Tag");

                    b.HasKey("SavedImageTagId");

                    b.HasIndex("SavedImageId");

                    b.ToTable("SavedImageTags");
                });

            modelBuilder.Entity("WebApplicationBasic.SavedImageTag", b =>
                {
                    b.HasOne("WebApplicationBasic.SavedImage")
                        .WithMany("Tags")
                        .HasForeignKey("SavedImageId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
