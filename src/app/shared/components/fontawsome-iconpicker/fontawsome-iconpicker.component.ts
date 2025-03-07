import { Component, OnInit} from '@angular/core';
import * as data from "../../../../assets/icons/font-awsome-icons.json";
import { RecordService } from '../../services/http/record.service';

@Component({
  selector: 'cost-tracker-fontawsome-iconpicker',
  templateUrl: './fontawsome-iconpicker.component.html',
  styleUrls: ['./fontawsome-iconpicker.component.scss']
})
export class FontawsomeIconpickerComponent implements OnInit {

  /**
   * Ikonok listája
   */
  iconList: string[] = [];

  constructor(public recordService: RecordService) {}

  ngOnInit(): void {
    let dataJson = data
    this.iconList = dataJson.icons
  }
}
