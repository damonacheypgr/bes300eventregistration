using EmployeesAPI.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(options =>
            {

                options.AddDefaultPolicy(policy =>
                {
                    var origins = Configuration.GetSection("origins").GetChildren().ToArray().Select(o => o.Value).ToArray();
                    policy.WithOrigins(origins);
                    policy.AllowAnyMethod();
                    policy.AllowCredentials();
                    policy.AllowCredentials();
                });
            });
            services.AddDbContext<EmployeesDataContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("employees"));
            });

            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.IgnoreNullValues = true;
            });
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "EmployeesAPI", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "EmployeesAPI v1"));

               
            }
            app.UseCors();
            app.UseRouting();

            app.UseAuthorization();

            // artificial delay to represent work.
            app.Use(async (context, next) =>
            {
                // you can't change anything.
                await Task.Delay(3000);
                await next.Invoke();
                // after the controller runs.
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
