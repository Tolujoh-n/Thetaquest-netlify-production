import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BgColorService } from 'src/app/services/bg-color.service';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-challenge-report',
  templateUrl: './challenge-report.component.html',
  styleUrls: ['./challenge-report.component.scss']
})
export class ChallengeReportComponent implements OnInit {
  public challengeId;
  public challengeData;
  isTeacher: boolean;
  constructor(private _bgColorService:BgColorService, private _authService: AuthService, private _router: Router, private reportsservice:ReportsService,private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    
    try {
      if(this._authService.isLoggedIn()){
        let userData = this._authService.getUserData();
        this.isTeacher = userData['role'] == "teacher";
      }
    } catch (error) {
      console.log(error);
    }
    
    this._bgColorService.updateBodyClass('qz-bg-blue-light');
    this.challengeId=this._Activatedroute.snapshot.paramMap.get("id");
    this.reportsservice.getChallengeReport(this.challengeId).subscribe(
      (res) => {
        console.log("Challnge reports: success")
        console.log(res);
        this.challengeData = res['data'];
      },
      (error) => {
        console.log("Challnge reports: Error")
        console.log(error);
      }
    );
  }

  
  logout() {
    console.log("in logout")
    this._authService.logOut();
    this._router.navigate(['/login'])
  }
}
  function logout() {
    throw new Error('Function not implemented.');
  }

