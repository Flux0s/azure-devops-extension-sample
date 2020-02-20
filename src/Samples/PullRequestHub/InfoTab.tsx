import * as React from "react"
import * as SDK from "azure-devops-extension-sdk"
import axios from "axios"
import {
  CommonServiceIds,
  IProjectPageService
} from "azure-devops-extension-api"
// import * as PAT from "../../../PAT.json"

export interface IInfoTabState {
  userName?: string
  projectName?: string
}

export class InfoTab extends React.Component<{}, IInfoTabState> {
  constructor(props: {}) {
    super(props)
    this.state = {}
  }
  public componentDidMount() {
    this.initializeState()
  }
  private async initializeState(): Promise<void> {
    axios
      .get(
        `https://dev.azure.com/JasonOwens/_apis/teams?api-version=5.1-preview.3`,
        {
          headers: {
            Authorization:
              "Basic " +
              window.btoa(
                ":" + ""
              )
          }
        }
      )
      .then((res) => {
        console.log(JSON.stringify(res.data))
      })

    await SDK.ready()
    const userName = SDK.getUser().displayName
    this.setState({
      userName
    })
    const projectService = await SDK.getService<IProjectPageService>(
      CommonServiceIds.ProjectPageService
    )
    const project = await projectService.getProject()
    if (project) {
      console.log(JSON.stringify(projectService))
      this.setState({ projectName: project.name })
    }
  }

  public render(): JSX.Element {
    const { userName, projectName } = this.state

    return (
      <div className='page-content page-content-top flex-column rhythm-vertical-16'>
        <div>
          Hello, { userName } from Project: { projectName }!
        </div>
        <div>
          List of Teams
          </div>
      </div>
    )
  }
}
